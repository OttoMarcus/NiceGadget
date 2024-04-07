// import React, { useState } from 'react';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// const { Range } = Slider;

// const RangeSlider = ({ min, max}) => {
//     const [range, setRange] = useState([20, 80]); // Изначальные значения ползунков

//     console.log('min: ', min);
//     console.log('max: ', max);
//     // console.log('value: ', value);

//   const handleRangeChange = (newRange) => {
//     setRange(newRange);
//   };

//     return (
//         // style={{ margin: '50px' }}
//     <div>
//       <Range
//         min={`${min}`} // Минимальное значение слайдера
//         max={`${max}`} // Максимальное значение слайдера
//         defaultValue={range} // Изначальные значения ползунков
//         onChange={handleRangeChange} // Функция обработчик изменения значения
//         allowCross={false} // Запретить пересечение ползунков
//       />
//       <p>
//         Range: {range[0]} - {range[1]}
//       </p>
//     </div>
//   );
// };

// export default RangeSlider;
