import React from "react";
import RenderNothing from "./RenderNothing";
import { globalStyles, sizes } from "../../../global";
import { colors } from "../../../theme";
import Video from "../../constants/icons/Video";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import Menu from "../../constants/icons/Menu";
import Call from "../../constants/icons/Call";
import ArrowLeft from "../../constants/icons/ArrowLeft";
import Smiley from "../../constants/icons/Smiley";
import Camera from "../../constants/icons/Camera";
import Attachment from "../../constants/icons/Attachment";
import Send from "../../constants/icons/Send";
import Mic from "../../constants/icons/Mic";
import MagnifyingGlass from "../../constants/icons/MagnifyingGlass";
import CircleClose from "../../constants/icons/CircleClose";
import ReplyArrow from "../../constants/icons/ReplyArrow";
import Pause from "../../constants/icons/Pause";
import Play from "../../constants/icons/Play";
import Pin from "../../constants/icons/Pin";
import Trash from "../../constants/icons/Trash";
import Images from "../../constants/icons/Images";
import Star from "../../constants/icons/Star";
import Unstar from "../../constants/icons/Unstar";
import Muted from "../../constants/icons/Muted";

const iconNameToComponentLookUp = {
  Video,
  Menu,
  Call,
  ArrowLeft,
  Smiley,
  Camera,
  Attachment,
  Send,
  Mic,
  MagnifyingGlass,
  CircleClose,
  ReplyArrow,
  Play,
  Pause,
  Pin,
  Trash,
  Images,
  Star,
  Unstar,
  Muted,
};

interface IconButtonProps extends PressableProps {
  usePressable?: boolean;
  isEnabled?: boolean;
  iconName: keyof typeof iconNameToComponentLookUp;
  pathFill: string;
  onPress?: PressableProps["onPress"];
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
}

export default ({
  isEnabled = true,
  usePressable = false,
  iconName,
  pathFill = colors.dark.secondaryLight,
  style = {},
  width = sizes.xl,
  height = sizes.xl,
  ...props
}: IconButtonProps) => {
  if (!isEnabled) return null;

  const IconComponent = iconNameToComponentLookUp[iconName] || RenderNothing;
  const content = (
    <IconComponent pathFill={pathFill} width={width} height={height} />
  );
  if (usePressable)
    return (
      <Pressable
        {...props}
        style={{ ...globalStyles.iconWrap, ...(style as object) }}
      >
        {content}
      </Pressable>
    );

  return (
    <Pressable
      onPress={props.onPress}
      style={{ ...globalStyles.iconWrap, ...(style as object) }}
    >
      {content}
    </Pressable>
  );
};
