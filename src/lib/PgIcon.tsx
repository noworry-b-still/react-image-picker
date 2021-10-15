import React, { FC } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

export interface PgIconProps {
  icon: TPgIcon;
  color?: "primary" | "secondary" | "default" | "contrast" | "error";
  size?: "small" | "medium" | "large";
  styleClass?: Array<string> | string;
}

const PgIcon: FC<PgIconProps> = ({
  color = "primary",
  icon,
  size = "medium",
  styleClass,
}) => {
  const classes = useStyles({});

  return (
    <i
      className={clsx(
        "icon",
        icon,
        {
          [classes.colorPrimary]: color === "primary",
          [classes.colorSecondary]: color === "secondary",
          [classes.colorDefault]: color === "default",
          [classes.colorContrast]: color === "contrast",
          [classes.colorError]: color === "error",
          [classes.sizeMedium]: size === "medium",
          [classes.sizeSmall]: size === "small",
          [classes.sizeLarge]: size === "large",
        },
        styleClass
      )}
    />
  );
};

const useStyles = makeStyles<Theme, any>((theme) => ({
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  colorContrast: {
    color: theme.palette.common.white,
  },
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  colorDefault: {
    color: theme.palette.grey["300"],
  },
  colorError: {
    color: theme.palette.error.main,
  },
  sizeMedium: {
    fontSize: 24,
  },
  sizeSmall: {
    fontSize: 18,
  },
  sizeLarge: {
    fontSize: 40,
  },
}));

export type TPgIcon =
  | "icon-add"
  | "icon-airplay"
  | "icon-android"
  | "icon-announce"
  | "icon-arrow-back"
  | "icon-arrow-next"
  | "icon-article"
  | "icon-bell"
  | "icon-browser"
  | "icon-calendar"
  | "icon-camera"
  | "icon-caption"
  | "icon-carrot-down"
  | "icon-carrot-left"
  | "icon-carrot-right"
  | "icon-carrot-up"
  | "icon-cc"
  | "icon-chat"
  | "icon-check-off"
  | "icon-check-on"
  | "icon-check"
  | "icon-checkbox-off"
  | "icon-checkbox-on"
  | "icon-clicks"
  | "icon-close"
  | "icon-clubhouse"
  | "icon-code"
  | "icon-collapse"
  | "icon-color"
  | "icon-customize"
  | "icon-date"
  | "icon-download"
  | "icon-drag"
  | "icon-duplicate"
  | "icon-edit"
  | "icon-elipses"
  | "icon-email"
  | "icon-external"
  | "icon-fb"
  | "icon-filter"
  | "icon-font-bold"
  | "icon-font-colorsvg"
  | "icon-font-italic"
  | "icon-font-size"
  | "icon-font-underline"
  | "icon-forward"
  | "icon-fullscreen"
  | "icon-globe"
  | "icon-grid"
  | "icon-handle"
  | "icon-home"
  | "icon-image"
  | "icon-info"
  | "icon-insights"
  | "icon-instagram"
  | "icon-ipad"
  | "icon-laptop"
  | "icon-link"
  | "icon-linkedin"
  | "icon-list"
  | "icon-loading"
  | "icon-map-location"
  | "icon-map-pin"
  | "icon-menu"
  | "icon-mic-off"
  | "icon-mic-on"
  | "icon-money"
  | "icon-p-justify"
  | "icon-p-left"
  | "icon-p-quote"
  | "icon-p-right"
  | "icon-pause"
  | "icon-percent"
  | "icon-person"
  | "icon-phone"
  | "icon-plus"
  | "icon-podcast"
  | "icon-question"
  | "icon-reminder-on"
  | "icon-reminder"
  | "icon-reset"
  | "icon-return"
  | "icon-reverse"
  | "icon-save-fill"
  | "icon-save"
  | "icon-search"
  | "icon-settings"
  | "icon-share"
  | "icon-shareout"
  | "icon-site"
  | "icon-smiley"
  | "icon-sort"
  | "icon-soundcloud"
  | "icon-spotify"
  | "icon-star-fill"
  | "icon-star"
  | "icon-strikethrough"
  | "icon-subscriber"
  | "icon-team"
  | "icon-theater"
  | "icon-ticker-negative"
  | "icon-ticker-positive"
  | "icon-ticket-multi"
  | "icon-ticket"
  | "icon-time"
  | "icon-trash"
  | "icon-twitch"
  | "icon-twitter"
  | "icon-video-off"
  | "icon-video-on"
  | "icon-view-off"
  | "icon-view-on"
  | "icon-volume-mute"
  | "icon-volume"
  | "icon-warning"
  | "icon-watch"
  | "icon-youtube";

export default PgIcon;
