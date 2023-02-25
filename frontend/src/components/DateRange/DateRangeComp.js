import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styled from 'styled-components'

const DatePicker = styled.div`
input.inputBox {
  font-size: 22px;
  padding: 5px 8px 4px 8px;
  border-radius: 3px;
  border: 1px solid #666;
}

.calendarWrap {
  display: inline-block;
  position: relative;
}

.calendarElement {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 40px;
  border: 1px solid #ccc;
  z-index: 999;
}`;

const DateRangeComp = ({ setRangeDates }) => {

      // date state
      const [range, setRange] = useState([
            {
                  startDate: new Date(),
                  endDate: addDays(new Date(), 1),
                  key: 'selection'
            }
      ])

      // open close
      const [open, setOpen] = useState(false)

      // get the target element to toggle 
      const refOne = useRef(null)

      useEffect(() => {
            // event listeners
            document.addEventListener("keydown", hideOnEscape, true)
            document.addEventListener("click", hideOnClickOutside, true)
      }, [])

      // hide dropdown on ESC press
      const hideOnEscape = (e) => {
            // console.log(e.key)
            if (e.key === "Escape") {
                  setOpen(false)
            }
      }

      // Hide on outside click
      const hideOnClickOutside = (e) => {
            // console.log(refOne.current)
            // console.log(e.target)
            if (refOne.current && !refOne.current.contains(e.target)) {
                  setOpen(false)
            }
      }
      setRangeDates(range)

      return (
            <DatePicker>
                  <div className="calendarWrap">

                        <input
                              value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
                              readOnly
                              className="inputBox"
                              onClick={() => setOpen(open => !open)}
                        />

                        <div ref={refOne}>
                              {open &&
                                    <DateRange
                                          onChange={item => setRange([item.selection])}
                                          editableDateInputs={true}
                                          moveRangeOnFirstSelection={false}
                                          ranges={range}
                                          months={1}
                                          direction="horizontal"
                                          className="calendarElement"
                                          disabledDates={[new Date("2 / 26 / 2023")]}
                                          minDate={new Date()}
                                    />
                              }
                        </div>

                  </div>
            </DatePicker>
      )
}

export default DateRangeComp