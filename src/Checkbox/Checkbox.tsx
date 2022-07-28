import {
  Checkbox as MantineCheckbox,
  CheckboxProps
} from '@mantine/core'

type Props = CheckboxProps & {
  checked: boolean;
  indeterminate: boolean;
  onChange: (event: unknown) => void
}

export function Checkbox ({ checked, indeterminate, onChange, ...rest }: Props) {
  return (
    <MantineCheckbox
      checked={checked}
      indeterminate={indeterminate}
      onChange={onChange}
      {...rest}
    />
  )
}
