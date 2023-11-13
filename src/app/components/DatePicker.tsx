import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DatePickerProps {
  onChange: (newValue: any) => void;
  value: string;
  label: string;
}

export default function BasicDateTimePicker(props: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        className="mt-10"
        onChange={props.onChange}
        value={props.value}
        label={props.label}
      />
    </LocalizationProvider>
  );
}
