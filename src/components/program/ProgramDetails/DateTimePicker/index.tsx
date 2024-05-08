import React from 'react';
import { DatePicker } from 'antd';
import es from 'antd/es/date-picker/locale/es_ES';
import dayjs, { Dayjs } from 'dayjs';
import { StyledColumn, StyledRow, StyledText } from '../../../styled/styles';

interface DateTimePickerProps {
  label: string;
  value: Dayjs;
  handleChange: (date: Dayjs) => void;
  minDate?: Dayjs;
  disable: boolean;
  defaultValue: Dayjs;
}

export const DateTimePicker = ({
  label,
  value,
  handleChange,
  minDate = dayjs(),
  disable,
  defaultValue,
}: DateTimePickerProps) => {
  return (
    <StyledRow css={{ gap: '16px' }}>
      <StyledColumn css={{ gap: '8px', justifyContent: 'flex-start' }}>
        <StyledText variant="body2" color="primary950">
          {label}
        </StyledText>
        <DatePicker
          value={value}
          format={'D MMMM YYYY - hh:mm A'}
          defaultValue={defaultValue ?? dayjs()}
          showTime
          locale={es}
          onChange={(date) => handleChange(date)}
          disabled={disable}
          minDate={minDate}
          needConfirm={false}
        />
      </StyledColumn>
    </StyledRow>
  );
};
