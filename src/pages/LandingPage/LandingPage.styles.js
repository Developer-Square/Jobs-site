import styled from "styled-components";
import rightImage from "image/5.jpg";
import leftImage from "image/3.jpg";

const skewDeg = "18deg";
const magicVH = "32.4vh";
const scrollTime = "1s";

export const SkewedPage = styled.div`
  // overflow: hidden;
  // position: relative;
  // height: 100vh;
  .skw-page {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    &__half {
      // top: 0;
      // width: 50%;
      // height: 100vh;

      width: 100%;
      height: 50vh;
      position: relative;
      // overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      @media screen and (min-width: 1200px) {
        position: absolute;
        width: 50%;
        height: 100vh;
      }

      /* transition: transform ${scrollTime}; */

      &--left {
        left: 0;
        transform: translate3d(-${magicVH}, 100%, 0);
        @media screen and (min-width: 1200px) {
          transform: translate3d(-${magicVH}, 100%, 0);
        }
      }

      &--right {
        transform: translate3d(${magicVH}, -100%, 0);
        @media screen and (min-width: 1200px) {
          left: 50%;
        }
      }

      .skw-page.active & {
        transform: translate3d(0, 0, 0);
      }
    }

    &__skewed {
      overflow: hidden;
      position: absolute;
      top: 0;
      width: 140%;
      height: 100%;
      transform: skewX(${skewDeg} * -1);
      background: #000;

      .skw-page__half--left & {
        @media screen and (min-width: 1200px) {
          left: -40%;
        }
      }
      .skw-page__half--right & {
        @media screen and (min-width: 1200px) {
          right: -40%;
        }
      }
    }

    &__content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column wrap;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 0 30%;
      color: #fff;
      transform: skewX(${skewDeg});
      //transition: transform ${scrollTime}, opacity ${scrollTime};
      background-size: cover;

      .caption {
        bottom: 40px;
        position: absolute;
        z-index: 10;
        color: #fff;
        text-align: center;

        @media screen and (min-width: 1200px) {
          bottom: 100px;
        }
      }

      .caption h1 {
        font: normal normal medium 18px/67px Montserrat;
        letter-spacing: 0.1em;
        margin-bottom: 5px;
        color: #fff;
      }
      .caption h5 {
        font: normal normal medium 18px/67px Montserrat;
        text-transform: uppercase;
        margin-bottom: 1em;
        color: #fff;
        font-size: 40px;
        font-weight: bold;
        line-height: 40px;
      }

      .caption .button {
        border-radius: 50px;
        color: #fff;
        padding: 0.5em 1.5em;
        text-decoration: none;
        font-weight: 600;
        font-size: 1em;
        letter-spacing: 0.05em;
        transition: 0.25s ease all;
      }
      .caption .button .btn-left {
        color: #fff;
      }
      .btn-right {
        border: 2px solid #fff;
        background-color: transparent;
      }

      .caption .btn-left:hover {
        background: #fff;
        color: #1849b1;
      }
      .caption .btn-right:hover {
        background: #fff;
        color: #1849b1;
      }

      .skw-page__half--left & {
        padding-left: 30%;
        padding-right: 30%;
        transform-origin: 100% 0;

        width: 100%;
        height: 50vh;
      }
      .skw-page__half--right & {
        padding-left: 30%;
        padding-right: 30%;
        transform-origin: 0 100%;

        width: 100%;
        height: 50vh;
      }
    }

    &__heading {
      margin-bottom: 15px;
      text-transform: uppercase;
      font-size: 25px;
      text-align: center;
    }

    &__description {
      font-size: 18px;
      text-align: center;
    }
    &-1 {
      .skw-page__half--left .skw-page__content {
        // background-size: cover !important;
        // background-position: center !important;
        // position: absolute;

        background-image: linear-gradient(
            to right,
            rgb(0 0 0 / 0.6),
            rgb(0 0 0 / 0.6)
          ),
          url(${leftImage});

        // background-image: url(${leftImage});
      }
      .skw-page__half--right .skw-page__content {
        // background-size: cover !important;
        // background-position: center !important;
        // position: absolute;

        background-image: linear-gradient(
            to right,
            rgb(33 39 127 / 0.6),
            rgb(33 39 127 / 0.6)
          ),
          url(${rightImage});
        // background-image: url(${rightImage});
      }
    }
  }
`;

export const Wrapper = styled.div`
  .left,
  .right {
    width: 100%;
    height: 50vh;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    // transform: skewX(-20deg);
  }

  .image {
    width: 100%;
    height: 100%;
    background-size: cover !important;
    background-position: center !important;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.25s ease all;
  }

  .left-image {
    background: url(${leftImage});
  }

  .right-image {
    background: url(${rightImage});
  }

  .caption {
    bottom: 40px;
    position: absolute;
    z-index: 10;
    color: #fff;
    text-align: center;
  }

  .caption h1 {
    font: normal normal medium 18px/67px Montserrat;
    letter-spacing: 0.1em;
    margin-bottom: 5px;
    color: #fff;
  }
  .caption h5 {
    font: normal normal medium 18px/67px Montserrat;
    text-transform: uppercase;
    margin-bottom: 0.4em;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    line-height: 30px;
  }

  .caption .button {
    border-radius: 50px;
    color: #fff;
    padding: 0.5em 1.5em;
    text-decoration: none;
    font-weight: 600;
    font-size: 1em;
    letter-spacing: 0.05em;
    transition: 0.25s ease all;
  }
  .caption .button .btn-left {
    color: #fff;
  }
  .btn-right {
    border: 2px solid #fff;
    background-color: transparent;
  }

  .caption .btn-left:hover {
    background: #fff;
    color: #1849b1;
  }
  .caption .btn-right:hover {
    background: #fff;
    color: #1849b1;
  }

  .left::before {
    background: linear-gradient(
      160deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    content: "";
    display: block;
  }
  .right::before {
    background: linear-gradient(
      160deg,
      rgba(33, 39, 127, 0.5) 0%,
      rgba(33, 39, 127, 0.5) 100%
    );
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    content: "";
    display: block;
  }

  .left:hover .image,
  .right:hover .image {
    transform: scale(1.1);
  }

  @media screen and (min-width: 1200px) {
    display: flex;

    .left,
    .right {
      width: 50%;
      height: 100vh;
    }
  }
`;
