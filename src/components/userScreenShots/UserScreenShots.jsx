import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import useHook from './useHook'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import ImageViewer from 'react-simple-image-viewer';
import Loader from '../loader/Loader'

export default function UserScreenShots() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])

  const openImageViewer = (url, index) => {
    setCurrentImage(index);
    setCurrentImageUrl(url);
  };

  const closeImageViewer = () => {
    setCurrentImageUrl(null)
    setCurrentImage(0);
    setIsViewerOpen(false);
  };


  const {  ScreenShotsImages } = useHook()
  const { id, date } = useParams()
  useEffect(() => {
    ScreenShotsImages(id, date, setData ,  setLoading)
  }, [ScreenShotsImages])

  return (
    <Layout>
    {loading ? 
    <Loader/>
    :
    (

      <div className='d-flex flex-wrap gap-3'>
        {data.slice().reverse().map((item, index) => {
          const startTimeMoment = moment.utc(item.startTime);
          const endTimeMoment = moment.utc(item.endTime );
          const duration = moment.duration(endTimeMoment.diff(startTimeMoment));
          const formattedDuration = `${duration.hours()} hours, ${duration.minutes()} minutes`;

  // Convert to local time
  const localStartTime = startTimeMoment.local();
  const localEndTime = endTimeMoment.local();


          return (
            <div key={index} className='w-100 d-grid gap-3' >
              <h2>{localStartTime.format('hh:mm:ss')} - {localEndTime.format('hh:mm:ss')} ({formattedDuration})</h2>
              <div className='d-flex flex-wrap gap-4 align-items-end p-2'>
                {item.images.map((element, index) => {
                  return (
                    <div key={index}>
                      <img src={`https://timer.builtinsoft.tech/public/${element}`} onClick={() => {openImageViewer(`https://timer.builtinsoft.tech/public/${element}`, index) }}
                        style={{ cursor: 'pointer' , width:'150px' }}
                        className='rounded-3'

                      />

                      {currentImageUrl && (
                        <ImageViewer
                          src={[currentImageUrl]}
                          className='w-100 h-100'
                          disableScroll={false}
                          closeOnClickOutside={true}
                          onClose={closeImageViewer}
                        />
                      )
                      }
                    </div>

                  )
                })

                }

              </div>
              <hr></hr>

            </div>
          );
        })}
      </div>
    )}
    </Layout>
  )
}
