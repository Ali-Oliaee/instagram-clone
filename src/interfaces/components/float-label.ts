export interface FloatLabelInput{
    label: string,
    value: string,
    onChange?: any,
    autoFocus?: boolean,
    textarea?: boolean,
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week',
    disabled?: boolean,
}
