import { Textbox } from "@create-figma-plugin/ui";
import { h } from "preact";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const KeyInput = ({ value, onChange, onFocus, onBlur }: Props) => {
  return (
    <Textbox
      data-cy="index_unconnected_key_input"
      placeholder="Key name"
      value={value}
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      variant="border"
      style={{
        fontSize: 12,
        height: 23,
      }}
    />
  );
};
