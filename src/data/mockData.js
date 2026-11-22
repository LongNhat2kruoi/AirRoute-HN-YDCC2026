export const TIME_SLOTS = [
  {
    label: '07:00', aria: '07 giờ 00', period: 'Giờ cao điểm sáng', shortPeriod: 'Cao điểm sáng',
    wind: '2,4', direction: 'Đông Nam', humidity: '78', weather: 'Nhiều mây',
    health: 'Không khí tại các giao lộ đang là yếu tố cần chú ý nhất.',
    advice: [
      'Ưu tiên tuyến ít điểm dừng đèn đỏ và tránh đi sát làn xe đông đúc.',
      'Nhóm nhạy cảm nên cân nhắc khẩu trang lọc bụi mịn phù hợp.',
      'Uống nước và theo dõi cơ thể nếu phải di chuyển trong thời gian dài.',
    ],
  },
  {
    label: '12:00', aria: '12 giờ 00', period: 'Buổi trưa', shortPeriod: 'Buổi trưa',
    wind: '3,1', direction: 'Nam', humidity: '61', weather: 'Nắng nhẹ',
    health: 'Gió mạnh hơn giúp giảm tụ tập bụi mịn tại một số khu vực.',
    advice: [
      'Tận dụng điều kiện gió thuận lợi để chọn tuyến có nhiều cây xanh.',
      'Mang nước và hạn chế vận động mạnh khi trời nắng gắt.',
      'Kiểm tra dự báo lại trước giờ về để tránh đợt cao điểm chiều.',
    ],
  },
  {
    label: '17:30', aria: '17 giờ 30', period: 'Giờ cao điểm chiều', shortPeriod: 'Cao điểm chiều',
    wind: '1,8', direction: 'Đông', humidity: '72', weather: 'Âm u',
    health: 'Mật độ xe tăng, các điểm nóng có thể duy trì lâu hơn.',
    advice: [
      'Cân nhắc rời điểm xuất phát sớm hơn hoặc muộn hơn giờ cao điểm.',
      'Tránh dừng lâu tại giao lộ lớn; giữ khoảng cách với phương tiện phía trước.',
      'Nhóm nhạy cảm nên ưu tiên phương tiện công cộng khi có thể.',
    ],
  },
  {
    label: '22:00', aria: '22 giờ 00', period: 'Buổi tối', shortPeriod: 'Buổi tối',
    wind: '1,5', direction: 'Bắc', humidity: '84', weather: 'Trời yên',
    health: 'Giao thông thưa hơn, nhưng chất lượng không khí vẫn khác nhau theo khu vực.',
    advice: [
      'Chọn tuyến có ánh sáng tốt và hạn chế các lối tắt vắng người.',
      'Không mặc định AQI buổi tối luôn thấp; theo dõi dự báo tại điểm đến.',
      'Chia sẻ hành trình với người thân nếu di chuyển một mình.',
    ],
  },
];

export const VEHICLES = {
  motorbike: { label: 'Xe máy', fullLabel: 'Xe máy xăng', timeFactor: 1, doseFactor: 1, emissions: 72 },
  bicycle: { label: 'Xe đạp', fullLabel: 'Xe đạp', timeFactor: 2.35, doseFactor: 1.35, emissions: 0 },
  ev: { label: 'Xe máy điện', fullLabel: 'Xe máy điện', timeFactor: 1, doseFactor: 1, emissions: 18 },
  bus: { label: 'Xe buýt', fullLabel: 'Xe buýt', timeFactor: 1.45, doseFactor: 0.68, emissions: 25 },
};

export const COMMUTES = [
  {
    id: 'cau-giay', origin: 'Cầu Giấy', destination: 'Hoàn Kiếm', purpose: 'Hành trình đi làm',
    start: [135, 420], end: [610, 270],
    fast: {
      distance: 8.6, time: [22, 16, 25, 13], aqi: [168, 91, 182, 64], dose: [22.1, 9.8, 24.3, 5.8],
      path: 'M 135 420 L 235 380 L 304 328 L 304 246 L 425 246 L 502 305 L 610 270',
      roads: ['Đường Láng', 'Ô Chợ Dừa', 'Chùa Bộc'],
    },
    clean: {
      distance: 9.4, time: [25, 18, 28, 15], aqi: [82, 54, 92, 41], dose: [14.3, 7.7, 14.9, 4.6],
      path: 'M 135 420 C 155 462 200 470 244 454 L 335 424 Q 373 402 409 408 L 495 367 Q 549 341 570 315 L 610 270',
      roads: ['Nguyễn Chí Thanh', 'Láng Hạ', 'Hai Bà Trưng'],
    },
    hotspots: [
      { name: 'Đường Láng', x: 304, y: 328, dx: -26, dy: 42, aqiOffset: -6 },
      { name: 'Ô Chợ Dừa', x: 304, y: 246, dx: -25, dy: -40, aqiOffset: 0 },
      { name: 'Chùa Bộc', x: 425, y: 246, dx: 0, dy: -40, aqiOffset: -12 },
    ],
    greenSpots: [
      { name: 'Công viên Cầu Giấy', x: 244, y: 454, dx: -5, dy: 39, aqiOffset: -18 },
      { name: 'Khu phố nhiều cây', x: 495, y: 367, dx: 28, dy: 30, aqiOffset: 0 },
    ],
    forecast: {
      fast: [[80.7, 85.1, 72.6, 60.4, 47.3, 39.2, 33.8], [50.3, 54.2, 58.6, 66.4, 79.8, 85.2, 76.1], [85.3, 89.1, 80.2, 68.7, 54.2, 43.5, 34.9], [18.8, 20.1, 19.4, 17.8, 16.9, 18.4, 20.5]],
      clean: [[27.5, 30.1, 29.2, 25.4, 21.6, 19.2, 17.1], [16.0, 18.3, 21.4, 25.8, 31.2, 33.4, 29.8], [32.3, 34.5, 31.4, 28.2, 24.8, 21.2, 18.1], [10.9, 11.6, 10.8, 10.1, 9.8, 10.6, 11.8]],
    },
  },
  {
    id: 'thanh-xuan', origin: 'Thanh Xuân', destination: 'Hai Bà Trưng', purpose: 'Hành trình đến trường',
    start: [190, 455], end: [610, 235],
    fast: {
      distance: 10.2, time: [26, 19, 30, 16], aqi: [174, 98, 188, 70], dose: [27.8, 12.1, 30.9, 7.2],
      path: 'M 190 455 L 270 390 L 270 300 L 375 300 L 460 250 L 525 280 L 610 235',
      roads: ['Nguyễn Trãi', 'Ngã Tư Sở', 'Xã Đàn'],
    },
    clean: {
      distance: 11.0, time: [29, 21, 33, 18], aqi: [88, 58, 97, 44], dose: [18.1, 9.4, 18.7, 5.5],
      path: 'M 190 455 Q 235 495 290 457 L 365 420 Q 402 395 440 400 L 530 335 Q 575 295 610 235',
      roads: ['Lê Văn Lương', 'Láng Hạ', 'Đại Cồ Việt'],
    },
    hotspots: [
      { name: 'Nguyễn Trãi', x: 270, y: 390, dx: -40, dy: 38, aqiOffset: -5 },
      { name: 'Ngã Tư Sở', x: 270, y: 300, dx: -32, dy: -40, aqiOffset: 0 },
      { name: 'Xã Đàn', x: 460, y: 250, dx: 10, dy: -40, aqiOffset: -9 },
    ],
    greenSpots: [
      { name: 'Khu đô thị Royal City', x: 290, y: 457, dx: 0, dy: 40, aqiOffset: -16 },
      { name: 'Công viên Thống Nhất', x: 530, y: 335, dx: 25, dy: 30, aqiOffset: 0 },
    ],
    forecast: {
      fast: [[83.2, 87.4, 76.1, 63.8, 51.3, 42.5, 36.4], [55.4, 58.2, 62.8, 72.4, 84.7, 89.3, 81.6], [88.8, 92.4, 83.7, 72.5, 57.8, 46.2, 37.1], [22.8, 24.2, 22.9, 21.3, 20.6, 22.1, 24.5]],
      clean: [[30.3, 33.1, 31.6, 27.9, 24.1, 21.3, 19.5], [17.8, 20.4, 23.6, 28.1, 33.5, 36.1, 32.7], [35.1, 37.6, 34.3, 30.8, 26.6, 23.1, 20.3], [12.3, 13.1, 12.2, 11.4, 10.9, 11.8, 13.2]],
    },
  },
  {
    id: 'ha-dong', origin: 'Hà Đông', destination: 'Đống Đa', purpose: 'Hành trình đi làm',
    start: [105, 460], end: [590, 215],
    fast: {
      distance: 12.4, time: [32, 24, 36, 20], aqi: [161, 86, 177, 61], dose: [32.4, 15.4, 35.1, 8.8],
      path: 'M 105 460 L 210 410 L 315 340 L 315 265 L 440 265 L 510 255 L 590 215',
      roads: ['Quang Trung', 'Nguyễn Trãi', 'Ngã Tư Sở'],
    },
    clean: {
      distance: 13.5, time: [36, 27, 40, 22], aqi: [79, 50, 87, 38], dose: [21.1, 12.0, 21.4, 6.5],
      path: 'M 105 460 Q 155 505 220 480 L 315 445 Q 360 425 390 392 L 465 355 Q 535 310 590 215',
      roads: ['Tố Hữu', 'Lê Văn Lương', 'Láng Hạ'],
    },
    hotspots: [
      { name: 'Quang Trung', x: 210, y: 410, dx: -30, dy: -40, aqiOffset: -7 },
      { name: 'Nguyễn Trãi', x: 315, y: 340, dx: 35, dy: 25, aqiOffset: -3 },
      { name: 'Ngã Tư Sở', x: 315, y: 265, dx: -30, dy: -40, aqiOffset: 0 },
    ],
    greenSpots: [
      { name: 'Khu phố Tố Hữu', x: 220, y: 480, dx: 0, dy: 36, aqiOffset: -16 },
      { name: 'Hành lang cây xanh', x: 465, y: 355, dx: 28, dy: 25, aqiOffset: 0 },
    ],
    forecast: {
      fast: [[77.3, 81.8, 69.4, 58.6, 45.8, 37.6, 32.1], [47.6, 51.3, 55.8, 63.2, 75.4, 80.6, 72.4], [82.6, 86.2, 77.5, 65.3, 52.6, 42.1, 33.8], [17.8, 19.2, 18.1, 16.8, 16.1, 17.5, 19.2]],
      clean: [[26.1, 28.4, 27.1, 23.8, 20.4, 18.1, 16.3], [14.2, 16.8, 20.1, 24.2, 29.4, 31.6, 28.1], [30.1, 32.5, 29.4, 26.5, 22.7, 19.8, 17.2], [9.8, 10.6, 9.9, 9.2, 8.8, 9.6, 10.8]],
    },
  },
];

export const FORECAST_LABELS = [
  ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
  ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  ['17:30', '18:30', '19:30', '20:30', '21:30', '22:30', '23:30'],
  ['22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00'],
];
