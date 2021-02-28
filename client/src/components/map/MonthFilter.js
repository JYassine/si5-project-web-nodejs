import { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export const MonthFilter = ({ changeMonthFilter }) => {
    const [dropdownOpen, setOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState('10')
    const months = ['05', '06', '07', '08', '09', '10', '11', '12', '01', '02'];

    const toggle = () => setOpen(!dropdownOpen);

    const handleClick = (e) => {
        setCurrentMonth(e.target.value);
        changeMonthFilter(e.target.value);
    }

    return (
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                {currentMonth}
            </DropdownToggle>
            <DropdownMenu>
                {months.map(month => {
                    return (
                        <DropdownItem
                        key={months.indexOf(month)}
                        onClick={handleClick}
                        value={month}
                        >
                            {month}
                        </DropdownItem>
                    )
                })}
            </DropdownMenu>
        </ButtonDropdown>
    )
    
}