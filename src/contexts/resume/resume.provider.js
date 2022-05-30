import {
  clone,
  findIndex,
  get,
  has,
  isUndefined,
  merge,
  set,
  setWith,
} from "lodash";
import { v4 as uuidv4 } from "uuid";
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useReducer,
} from "react";
import arrayMove from "array-move";
import i18next from "i18next";
import demoState from "data/demoState.json";
import DatabaseContext from "contexts/database/database.provider";
import initialState from "data/initialState.json";
import { objDiff } from "utils";
import omitDeep from "omit-deep-lodash";

const ResumeContext = createContext({});

const ResumeProvider = ({ children }) => {
  const { debouncedUpdateResume } = useContext(DatabaseContext);

  const memoizedReducer = useCallback(
    (state, { type, payload }) => {
      let newState;
      let index;
      let items;
      let temp;
      let diff;
      let val = [];
      let variables;
      let returnState;

      switch (type) {
        case "on_add_item":
          console.log("add item");
          delete payload.value.temp;
          items = get(state, payload.path, []);
          if (items === null) {
            items = [];
          }
          console.log(items);
          val.push(payload.value);
          newState = setWith(clone(state), `${payload.path}Add`, val, clone);
          returnState = setWith(
            clone(state),
            payload.path,
            [...items, payload.value],
            clone,
          );
          diff = objDiff(state, newState, [
            "id",
            "name",
            "public",
            "title",
            "heading",
            "descriptionPlaintext",
            "description",
          ]);
          delete diff[payload.path.split(".")[0]].id;

          debouncedUpdateResume(diff);
          return returnState;

        case "on_edit_item":
          console.log("edit item");
          delete payload.value.temp;
          items = get(state, payload.path);
          index = findIndex(items, ["id", payload.value.id]);
          val.push(
            objDiff(
              items.find(({ id }) => id === payload?.value?.id),
              payload.value,
              ["id"],
            ),
          );
          newState = setWith(clone(state), `${payload.path}Update`, val, clone);
          returnState = setWith(
            clone(state),
            `${payload.path}[${index}]`,
            payload.value,
            clone,
          );
          diff = objDiff(state, newState, [
            "id",
            "name",
            "public",
            "title",
            "heading",
            "descriptionPlaintext",
            "description",
          ]);
          delete diff[payload.path.split(".")[0]].id;
          variables = setWith(
            clone(diff),
            `${payload.path}Update.id`,
            payload.value.id,
            clone,
          );
          variables.id = newState.id;
          debouncedUpdateResume(variables);
          return returnState;

        case "on_delete_item":
          console.log("calling on delete");
          items = get(state, payload.path);
          index = findIndex(items, ["id", payload.value.id]);
          items.splice(index, 1);
          newState = setWith(
            clone(state),
            `${payload.path}Remove`,
            items,
            clone,
          );
          debouncedUpdateResume(newState);
          return newState;

        case "on_toggle_use_item":
          items = get(state, payload.path);
          index = findIndex(items, ["id", payload.value.id]);

          if ("isActive" in items[index]) {
            items[index].isActive = !items[index].isActive;
            val.push({ id: items[index].id, isActive: !items[index].isActive });
          } else {
            items[index].isActive = false;
            val.push({ id: items[index].id, isActive: false });
          }
          newState = setWith(clone(state), `${payload.path}Update`, val, clone);
          returnState = setWith(
            clone(state),
            `${payload.path}[${index}]`,
            payload.value,
            clone,
          );
          diff = objDiff(state, newState, [
            "id",
            "name",
            "public",
            "title",
            "heading",
            "descriptionPlaintext",
            "description",
          ]);

          delete diff[payload.path.split(".")[0]].id;
          variables = setWith(
            clone(diff),
            `${payload.path}Update.id`,
            payload.value.id,
            clone,
          );
          variables.id = newState.id;
          debouncedUpdateResume(variables);
          return returnState;

        case "on_move_item_up":
          console.log("calling on move item up");
          items = get(state, payload.path);
          index = findIndex(items, ["id", payload.value.id]);
          items = arrayMove(items, index, index - 1);
          newState = setWith(clone(state), payload.path, items, clone);
          debouncedUpdateResume(newState);
          return newState;

        case "on_move_item_down":
          console.log("calling on move item down");
          items = get(state, payload.path);
          index = findIndex(items, ["id", payload.value.id]);
          items = arrayMove(items, index, index + 1);
          newState = setWith(clone(state), payload.path, items, clone);
          debouncedUpdateResume(newState);
          return newState;

        case "change_language":
          console.log("calling change language");
          newState = set(clone(state), "resumemetadata.language", payload);
          items = get(
            i18next.getDataByLanguage(payload),
            "translation.builder.sections",
          );
          Object.keys(items).forEach((key) => {
            has(newState, `${key}.heading`) &&
              set(newState, `${key}.heading`, items[key]);
          });
          newState = setWith(clone(state), payload.path, payload.value, clone);
          returnState = newState;
          variables = objDiff(state, newState, [
            "id",
            "name",
            "public",
            "title",
            "heading",
            "descriptionPlaintext",
            "description",
            "primaryColor",
            "backgroundColor",
            "textColor",
            "fontSize",
            "font",
          ]);
          debouncedUpdateResume(variables);
          return returnState;

        case "reset_layout":
          console.log("calling reset layout");
          temp = get(state, "resumemetadata.template");
          index = findIndex(get(state, "resumemetadata.template"), [
            "name",
            temp,
          ]);
          items = get(initialState, `resumemetadata.layouts[${index}]`);
          newState = setWith(
            clone(state),
            `resumemetadata.layoutsAdd`,
            items,
            clone,
          );
          debouncedUpdateResume(newState);
          return newState;

        case "on_input":
          console.log("add on input", payload);
          let path = `${payload.path}${
            payload.path.split(".")[0] === "resumemetadata" || "objective"
              ? ""
              : "Update"
          }`;
          let indexPath = parseInt(payload.path.split("[")[1]);
          if (indexPath) {
            let idx = parseInt(indexPath.charAt(0));
            if (payload.path === `resumemetadata.layouts[${idx}].collection`) {
              path = "resumemetadata.layoutsUpdate";
              payload.value = [
                {
                  id: state.resumemetadata.layouts[idx].id,
                  name: state.resumemetadata.layouts[idx].name,
                  collection: payload.value,
                },
              ];
            }
          }

          payload.value = omitDeep(payload.value, ["social"]);

          newState = setWith(clone(state), path, payload.value, clone);
          returnState = newState;
          variables = objDiff(state, newState, [
            "id",
            "name",
            "public",
            "title",
            "heading",
            "descriptionPlaintext",
            "description",
            "primaryColor",
            "backgroundColor",
            "textColor",
            "fontSize",
            "collection",
            "font",
          ]);
          variables = omitDeep(variables, [
            "updatedAt",
            "uuid",
            "createdAt",
            "slug",
          ]);
          if (variables[payload.path.split(".")[0]].id) {
            delete variables[payload.path.split(".")[0]].id;
          }

          debouncedUpdateResume(variables);
          return returnState;

        case "on_import":
          console.log("calling on import ");
          temp = clone(state);
          newState = payload;
          newState.id = temp.id;
          newState.name = temp.name;
          newState.createdAt = temp.createdAt;
          newState.updatedAt = temp.updatedAt;
          debouncedUpdateResume(newState);
          return newState;

        case "on_import_jsonresume":
          console.log("calling on import json data");
          temp = clone(state);
          newState = initialState;
          newState.id = temp.id;
          newState.name = temp.name;
          newState.preview = temp.preview;
          newState.createdAt = temp.createdAt;
          newState.updatedAt = temp.updatedAt;
          // newState.profile = {
          //   address: {
          //     city: get(payload, "basics.location.city"),
          //     line1: get(payload, "basics.location.address"),
          //     line2: get(payload, "basics.location.region"),
          //     pincode: get(payload, "basics.location.postalCode"),
          //   },
          //   email: get(payload, "basics.email"),
          //   firstName: get(payload, "basics.name"),
          //   phone: get(payload, "basics.phone"),
          //   photograph: get(payload, "basics.picture"),
          //   subtitle: get(payload, "basics.label"),
          //   website: get(payload, "basics.website"),
          // };
          newState.social.items = get(payload, "basics.profiles")
            ? payload.basics.profiles.map((x) => ({
                id: uuidv4(),
                network: x.network,
                username: x.username,
                url: x.url,
              }))
            : [];
          newState.objective.descriptionPlaintext = get(
            payload,
            "basics.summary",
          );
          newState.work.items = payload.work
            ? payload.work.map((x) => ({
                id: uuidv4(),
                company: x.company,
                endDate: x.endDate,
                position: x.position,
                startDate: x.startDate,
                summary: x.summary,
                website: x.website,
              }))
            : [];
          newState.education.items = payload.education
            ? payload.education.map((x) => ({
                id: uuidv4(),
                degree: x.studyType,
                endDate: x.endDate,
                field: x.area,
                gpa: x.gpa,
                institution: x.institution,
                startDate: x.startDate,
                summary: x.courses.join("\n"),
              }))
            : [];
          newState.award.items = payload.award
            ? payload.award.map((x) => ({
                id: uuidv4(),
                awarder: x.awarder,
                date: x.date,
                summary: x.summary,
                title: x.title,
              }))
            : [];
          newState.skill.items = payload.skill
            ? payload.skill.map((x) => ({
                id: uuidv4(),
                level: "Fundamental Awareness",
                name: x.name,
              }))
            : [];
          newState.hobby.items = payload.hobby
            ? payload.hobby.map((x) => ({
                id: uuidv4(),
                name: x.name,
              }))
            : [];
          newState.language.items = payload.language
            ? payload.language.map((x) => ({
                id: uuidv4(),
                name: x.language,
                fluency: x.fluency,
              }))
            : [];
          newState.reference.items = payload.reference
            ? payload.reference.map((x) => ({
                id: uuidv4(),
                name: x.name,
                summary: x.reference,
              }))
            : [];
          // debouncedUpdateResume(newState);
          return newState;

        case "set_data":
          console.log("calling set data");
          newState = payload;
          return newState;

        case "reset_data":
          console.log("calling reset data");
          temp = clone(state);
          returnState = initialState;
          returnState.id = state.id;
          returnState.description = state.description;
          returnState.descriptionPlaintext = state.descriptionPlaintext;
          returnState.isActive = state.isActive;
          returnState.metadata = state.metadata;
          returnState.name = state.name;
          returnState.privateMetadata = state.privateMetadata;
          returnState.public = state.public;
          returnState.seoDescription = state.seoDescription;
          returnState.seoTitle = state.seoTitle;
          returnState.owner = state.owner;
          initialState.owner = state.owner;
          newState = state;
          const toOmit = [
            "addresses",
            "allLayouts",
            "description",
            "descriptionPlaintext",
            "isActive",
            "isDeleted",
            "metadata",
            "name",
            "privateMetadata",
            "public",
            "seoDescription",
            "seoTitle",
            "createdAt",
            "resumemetadata",
            "profile",
            "updatedAt",
            "uuid",
            "slug",
            "__typename",
            "name",
            "objective",
            "owner",
            "id",
          ];

          for (let i = 0; i < toOmit.length; i++) {
            delete newState[toOmit[i]];
          }

          variables = Object.values(newState).reduce((obj, val) => {
            const delValues = val.items.reduce((arr, a) => {
              arr.push(a.id);
              return arr;
            }, []);
            const newObj = setWith(clone(val), `itemsRemove`, delValues, clone);
            const anotherObj = objDiff(val, newObj);
            const objName = Object.keys(newState).find(
              (key) => newState[key] === val,
            );
            obj[objName] = anotherObj;
            return obj;
          }, {});

          variables.id = returnState.id;
          variables.name = returnState.name;
          variables.description = returnState.description;
          variables.descriptionPlaintext = returnState.descriptionPlaintext;
          variables.isActive = returnState.isActive;
          variables.metadata = returnState.metadata;
          variables.privateMetadata = returnState.privateMetadata;
          variables.public = returnState.public;
          variables.seoDescription = returnState.seoDescription;
          variables.seoTitle = returnState.seoTitle;
          variables.objective = returnState.objective;

          debouncedUpdateResume(variables);
          return returnState;

        case "load_demo_data":
          console.log("calling load demo data");
          newState = merge(clone(state), demoState);
          returnState = newState;

          returnState.id = state.id;
          returnState.description = state.description;
          returnState.descriptionPlaintext = state.descriptionPlaintext;
          returnState.isActive = state.isActive;
          returnState.metadata = state.metadata;
          returnState.name = state.name;
          returnState.privateMetadata = state.privateMetadata;
          returnState.public = state.public;
          returnState.seoDescription = state.seoDescription;
          returnState.seoTitle = state.seoTitle;
          returnState.id = state.id;
          returnState.owner = state.owner;
          returnState = Object.values(newState).reduce((obj, val) => {
            let anotherObj = val;
            if (typeof val === "object" && val !== null) {
              if (anotherObj.itemsAdd) {
                let oldItems = anotherObj.items || [];
                anotherObj.items = anotherObj.itemsAdd.concat(oldItems);
                delete anotherObj.itemsAdd;
              }
            }
            const objName = Object.keys(newState).find(
              (key) => newState[key] === val,
            );
            obj[objName] = anotherObj;
            return obj;
          }, {});

          variables = demoState;
          variables.description = state.description;
          variables.descriptionPlaintext = state.descriptionPlaintext;
          variables.isActive = state.isActive;
          variables.metadata = state.metadata;
          variables.name = state.name;
          variables.privateMetadata = state.privateMetadata;
          variables.public = state.public;
          variables.seoDescription = state.seoDescription;
          variables.seoTitle = state.seoTitle;
          variables.id = state.id;
          delete variables.resumemetadata;
          delete variables.profile;
          debouncedUpdateResume(variables);
          return returnState;

        default:
      }
    },
    [debouncedUpdateResume],
  );

  const [state, dispatch] = useReducer(memoizedReducer, initialState);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

const useSelector = (path, fallback) => {
  const { state } = useContext(ResumeContext);
  let value = get(state, path);

  if (isUndefined(value)) {
    value = isUndefined(fallback) ? state : fallback;
  }

  return value;
};

const useDispatch = () => {
  const { dispatch } = useContext(ResumeContext);
  return dispatch;
};

const memoizedProvider = memo(ResumeProvider);

export {
  ResumeContext,
  memoizedProvider as ResumeProvider,
  useSelector,
  useDispatch,
};
