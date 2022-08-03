import { ChangeEvent } from 'react'
import {
  Checkbox as MantineCheckbox,
  CheckboxProps
} from '@mantine/core'
import PropTypes from 'prop-types'

type Props = CheckboxProps & {
  checked: boolean;
  indeterminate: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
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

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  indeterminate: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}
