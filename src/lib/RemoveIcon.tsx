import React, { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import PgIcon, { PgIconProps } from "./PgIcon";

export type IRemoveIconProps = Omit<PgIconProps, "icon">;

const RemoveIcon: FC<IRemoveIconProps> = (props) => {
  const classes = useStyles({});
  const { size = "medium", ...rest } = props;
  const { color } = props;
  let iconSize = size;
  if (size === "medium") iconSize = "small";
  if (size === "large") iconSize = "medium";
  return (
    <PgIcon
      styleClass={clsx(classes.root, {
        [classes.colorPrimary]: color === "primary",
        [classes.colorSecondary]: color === "secondary",
        [classes.colorDefault]: color === "default",
        [classes.colorContrast]: color === "contrast",
      })}
      icon="icon-close"
      size={iconSize}
      {...rest}
    />
  );
};

const useStyles = makeStyles<Theme>((theme) => {
  const {
    palette: { grey },
  } = theme;
  return createStyles({
    colorPrimary: {
      borderColor: theme.palette.primary.main,
    },
    colorContrast: {
      borderColor: theme.palette.common.white,
    },
    colorSecondary: {
      borderColor: theme.palette.secondary.main,
    },
    colorDefault: {
      borderColor: grey["300"],
    },
    root: {
      border: "1px solid",
      borderRadius: "50%",
      padding: 3,
    },
    sizeMedium: {
      fontSize: 24,
    },
    sizeSmall: {
      fontSize: 18,
    },
  });
});

export default RemoveIcon;
