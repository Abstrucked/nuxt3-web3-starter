import type {ButtonVariant} from "#ui/types";

declare type Link = {
  name: string,
  to: string,
  icon?: string,
  color?: string,
  variant?: ButtonVariant
}

export type { Link }