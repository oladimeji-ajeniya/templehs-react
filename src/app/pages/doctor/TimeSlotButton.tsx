import ContentSlider from 'src/app/theme-layouts/shared-components/ContentSlider';
import Button from '@mui/material/Button';

const items = [
  <Button variant="outlined">Today, 3:00PM</Button>,
  <Button variant="outlined">Today, 6:30PM</Button>,
  <Button variant="outlined">Wed 3/29, 1:30PM</Button>,
];

function TimeSlotSlider() {
  return (
    <div className="container mx-auto">
      <ContentSlider items={items} />
    </div>
  );
}

export default TimeSlotSlider;
