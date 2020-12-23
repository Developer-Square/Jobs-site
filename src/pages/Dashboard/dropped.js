const toggleManage = (category, id) => {
    setForm();
    history.push(`/dashboard/${category}/${id}`);
};
const handleModal = (text, subtext, fxn) => {
    openModal({
        show: true,
        overlayClassName: "quick-view-overlay",
        closeOnClickOutside: true,
        component: () => EmailVerificationModal(text, subtext, fxn),
        closeComponent: "",
        config: {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: 458,
            height: "auto",
        },
    });
};
const handleApplication = (jobId) => {
    openModal({
        show: true,
        overlayClassName: "quick-view-overlay",
        closeOnClickOutside: true,
        component: localStorage.getItem("thedb_individual_profile")
            ? () => ApplicationModal(jobId)
            : () =>
                EmailVerificationModal(
                    `Hey ${profile.full_name}`,
                    "Complete your 'Additional Details' profile to apply for this job",
                    <Offer style={{ padding: "10px 0" }}>
                        Update{" "}
                        <LinkButton onClick={() => history.push("/dashboard/profile")}>
                            Profile
                </LinkButton>
                    </Offer>
                ),
        closeComponent: "",
        config: {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: 458,
            height: "auto",
        },
    });
};


<LeftContent>
    <>
        {jobs !== null && jobs.length > 0 ? (
            <ul>
                {jobs.map((job, index) => (
                    <li key={index} className={`${job.job_type}`}>
                        <section>
                            <ListingLogo>
                                <ImageWrapper
                                    // url={job.picture}
                                    alt={"company logo"}
                                    id={job.creator}
                                />
                            </ListingLogo>
                            <ListingTitle>
                                <h3>
                                    {job.title}
                                    <TypeList>
                                        <ListSpan className={`${job.job_type}`}>
                                            {job.job_type}
                                        </ListSpan>

                                        {job.creator === profile.id ? (
                                            <Button
                                                onClick={() =>
                                                    toggleManage(
                                                        categorySelector(job.job_type),
                                                        job.id
                                                    )
                                                }
                                                size="small"
                                                title={`Manage`}
                                                // disabled={!profile.is_verified}
                                                style={{
                                                    fontSize: 15,
                                                    color: "#21277f",
                                                    backgroundColor: "#e6c018",
                                                    // float: "left",
                                                    height: "29px",
                                                    margin: "0 10px",
                                                }}
                                            />
                                        ) : (
                                                <>
                                                    {profile.is_individual ? (
                                                        <>
                                                            {applications ? (
                                                                <>
                                                                    {applications.includes(job.id) ? (
                                                                        <Button
                                                                            onClick={() =>
                                                                                profile.is_verified
                                                                                    ? handleApplication(job.id)
                                                                                    : handleModal(
                                                                                        `Confrim email to Apply`,
                                                                                        `or`,
                                                                                        <Button
                                                                                            onClick={() =>
                                                                                                openModal({
                                                                                                    show: true,
                                                                                                    overlayClassName:
                                                                                                        "quick-view-overlay",
                                                                                                    closeOnClickOutside: true,
                                                                                                    component: ResendEmail,
                                                                                                    closeComponent: "",
                                                                                                    config: {
                                                                                                        enableResizing: false,
                                                                                                        disableDragging: true,
                                                                                                        className:
                                                                                                            "quick-view-modal",
                                                                                                        width: 458,
                                                                                                        height: "auto",
                                                                                                    },
                                                                                                })
                                                                                            }
                                                                                            size="small"
                                                                                            title={`Send email again`}
                                                                                            style={{
                                                                                                fontSize: 15,
                                                                                                color: "#fff",
                                                                                                backgroundColor:
                                                                                                    "#e618a5",
                                                                                                margin: "10px 10px",
                                                                                            }}
                                                                                        />
                                                                                    )
                                                                            }
                                                                            size="small"
                                                                            title={`Applied ✔`}
                                                                            disabled={true}
                                                                            style={{
                                                                                fontSize: 15,
                                                                                color: "#21277f",
                                                                                backgroundColor: "#f2f2f2",
                                                                                float: "right",
                                                                                height: "29px",
                                                                                margin: "0 0 0 10px",
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                            <Button
                                                                                onClick={() =>
                                                                                    profile.is_verified
                                                                                        ? handleApplication(job.id)
                                                                                        : handleModal(
                                                                                            `Confrim email to Apply`,
                                                                                            `or`,
                                                                                            <Button
                                                                                                onClick={() =>
                                                                                                    openModal({
                                                                                                        show: true,
                                                                                                        overlayClassName:
                                                                                                            "quick-view-overlay",
                                                                                                        closeOnClickOutside: true,
                                                                                                        component: ResendEmail,
                                                                                                        closeComponent: "",
                                                                                                        config: {
                                                                                                            enableResizing: false,
                                                                                                            disableDragging: true,
                                                                                                            className:
                                                                                                                "quick-view-modal",
                                                                                                            width: 458,
                                                                                                            height: "auto",
                                                                                                        },
                                                                                                    })
                                                                                                }
                                                                                                size="small"
                                                                                                title={`Send email again`}
                                                                                                style={{
                                                                                                    fontSize: 15,
                                                                                                    color: "#fff",
                                                                                                    backgroundColor:
                                                                                                        "#e618a5",
                                                                                                    margin: "10px 10px",
                                                                                                }}
                                                                                            />
                                                                                        )
                                                                                }
                                                                                size="small"
                                                                                title={`Apply`}
                                                                                // disabled={!profile.is_verified}
                                                                                style={{
                                                                                    fontSize: 15,
                                                                                    color: "#21277f",
                                                                                    backgroundColor: profile.is_verified
                                                                                        ? "#e6c018"
                                                                                        : "#f2f2f2",
                                                                                    float: "right",
                                                                                    height: "29px",
                                                                                    margin: "0 0 0 10px",
                                                                                }}
                                                                            />
                                                                        )}
                                                                </>
                                                            ) : (
                                                                    <Button
                                                                        onClick={() =>
                                                                            profile.is_verified
                                                                                ? handleApplication(job.id)
                                                                                : handleModal(
                                                                                    `Confrim email to Apply`,
                                                                                    `or`,
                                                                                    <Button
                                                                                        onClick={() =>
                                                                                            openModal({
                                                                                                show: true,
                                                                                                overlayClassName:
                                                                                                    "quick-view-overlay",
                                                                                                closeOnClickOutside: true,
                                                                                                component: ResendEmail,
                                                                                                closeComponent: "",
                                                                                                config: {
                                                                                                    enableResizing: false,
                                                                                                    disableDragging: true,
                                                                                                    className:
                                                                                                        "quick-view-modal",
                                                                                                    width: 458,
                                                                                                    height: "auto",
                                                                                                },
                                                                                            })
                                                                                        }
                                                                                        size="small"
                                                                                        title={`Send email again`}
                                                                                        style={{
                                                                                            fontSize: 15,
                                                                                            color: "#fff",
                                                                                            backgroundColor:
                                                                                                "#e618a5",
                                                                                            margin: "10px 10px",
                                                                                        }}
                                                                                    />
                                                                                )
                                                                        }
                                                                        size="small"
                                                                        title={`Apply`}
                                                                        // disabled={!profile.is_verified}
                                                                        style={{
                                                                            fontSize: 15,
                                                                            color: "#21277f",
                                                                            backgroundColor: profile.is_verified
                                                                                ? "#e6c018"
                                                                                : "#f2f2f2",
                                                                            float: "right",
                                                                            height: "29px",
                                                                            margin: "0 0 0 10px",
                                                                        }}
                                                                    />
                                                                )}
                                                        </>
                                                    ) : null}
                                                </>
                                            )}
                                    </TypeList>
                                </h3>
                                <ListingIcons>
                                    <li>
                                        <div
                                            className={`description`}
                                            style={{
                                                height: "20px",
                                                width: "85%",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: job.description,
                                            }}
                                        />
                                    </li>
                                    <li>
                                        <SearchIcon />
                                        {job.location}
                                    </li>
                                    <li>
                                        <RefundIcon />
                                        {CURRENCY}

                                        {job.salary}
                                    </li>
                                </ListingIcons>
                            </ListingTitle>
                        </section>
                    </li>
                ))}
            </ul>
        ) : (
                <div>Sorry No recent listings available</div>
            )}
    </>
</LeftContent>