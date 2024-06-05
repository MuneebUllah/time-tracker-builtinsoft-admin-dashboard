import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { useNavigate, useParams } from 'react-router-dom';
import useHook from './useHook';
import moment from 'moment';
import { addDays } from 'date-fns';
import './userDetail.scss'
import Loader from '../loader/Loader';

export default function UserDetail() {
  const { getTotalTime , usersNameById} = useHook()
  const { id } = useParams()
  const [data, setData] = useState([])
  const [loading , setLoading] = useState(true)
  const [state, setState] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: 'selection'
    }]
  );

  const navigate = useNavigate();

  const userScreenShots = (date) => {
    navigate(`/user-screenshots/${id}&date=${date}`)
  }

  useEffect(() => {
    getTotalTime(id, state[0].startDate, state[0].endDate, setData , setLoading)
    usersNameById(id)

  }, [getTotalTime])

  const isDayDisabled = (date) => {
    // Add your logic here to determine if the day should be disabled
    // For example, let's disable Saturdays and Sundays
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday (0) or Saturday (6)
  };

  return (
    <Layout>
      <div className='w-100'>
      {
        loading ? 
        <Loader/>
        :(   
          <>
        <div className='p-4'>
          <h1>Daily Works</h1>
        </div>
        <div className='d-flex mb-4 justify-content-center flex-wrap daily-work'>
          <div className='calander'>
            <DateRange
              editableDateInputs={true}
              onChange={item => {
                setState([item.selection])
                getTotalTime(id, item.selection.startDate, item.selection.endDate, setData , setLoading)
              }}
              moveRangeOnFirstSelection={false}
              ranges={state}
              disabledDay={isDayDisabled}
            />
          </div>

          <div className=' d-flex flex-wrap flex-column gap-5 justify-content-start daily-work-data'>
            <div className='w-100'>
              <h1>{data.length > 0 && state.length > 0 ? moment(state[0].startDate.toLocaleString()).format('MMM DD') : ''}  {data.length > 0 && state.length > 0 ? (state[0].endDate !== '' ? ` - ${moment(state[0].endDate.toLocaleString()).format('MMM DD')}` : '') : ''}</h1>
            </div>
            <div className='w-100 d-grid gap-5 align-items-center ps-5'>
              {data.length > 0 ? (
                data.slice().reverse().map((item, index) => {
                //============= Date Formation ===================
                  const dateStr = item.date;
                  const parsedDate = moment(dateStr);
                  const formattedDate = parsedDate.format('MMM DD, dddd');

                  //================ Time Formation ===============
                  const timeInMiliseconds = item.totalTime;
                  const duration = moment.duration(timeInMiliseconds);
                  const hours = Math.floor(duration.asHours());
                  const minutes = duration.minutes();
                  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
                  const timeInPercentage = moment.duration(formattedTime)
                  const totalTimeAvailable = moment.duration('8:00');

                  const percentage = ((timeInPercentage.asMilliseconds() / totalTimeAvailable.asMilliseconds()) * 100).toFixed(2);

                  return (
                    <div className='w-100 d-flex gap-4 align-items-start' key={index}>
                      <h5 style={{width:"120px" , cursor:"pointer"}} onClick={() => userScreenShots(item.date)}>{formattedDate}</h5>
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated fs-5"
                          role="progressbar"
                          style={{ width: `${percentage}%` , cursor:"pointer" }}
                          
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          
                        ></div>
                        <h6 className={percentage > 50 ? 'percentage text-white text-center' : 'percentage text-center'} >{percentage}%</h6>
                      </div>
                      <h5>{formattedTime} hrs</h5>
                    </div>
                  )
                })) :
                <div className='h-100 d-flex align-items-center'>
                  <h1 className='text-center align-items-center'>No Data Found</h1>
                </div>
              }
            </div>
          </div>

        </div>
        </>
        )
      }
      </div>
    </Layout>
  )
}