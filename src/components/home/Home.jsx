import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h3>Edit Options</h3>
      <ul>
        <Link to="/menu">Edit Menu</Link>
      </ul>
    </>
  );
}
