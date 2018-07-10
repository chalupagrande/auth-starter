import React from 'react'

const UserSvg = (props) =>{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width={props.width || 30} height={props.height || 30}>
      <path fill={props.isHovered ? '#3D70B2' : 'white'} d="M500 990C229.4 990 10 770.6 10 500S229.4 10 500 10s490 219.4 490 490-219.4 490-490 490zm269-141.1c-45.2-104.1-148.2-177.4-269-177.4s-223.9 73.1-269.1 177.3C305.3 906.4 398.6 941 500 941c101.4 0 194.5-34.5 269-92.1zM647 451c0-81.2-65.8-147-147-147s-147 65.8-147 147 65.8 147 147 147 147-65.8 147-147zM500 59C256.5 59 59 256.5 59 500c0 123.8 51.1 235.5 133.3 315.6 44.8-91.8 129-160.8 231-184.2C353.2 601.6 304 532 304 451c0-108.2 87.8-196 196-196s196 87.8 196 196c0 81-49.2 150.6-119.3 180.4 102 23.3 186.1 92.4 231 184.2C889.8 735.6 941 623.8 941 500c0-243.5-197.5-441-441-441z"/>
    </svg>
  )
}

export default UserSvg