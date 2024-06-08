import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Ad_Table from './Ad_Table'

export default function Ad_Lecturers() {
  const [Lecturers, setLecturers] = useState([]);
  const [error, setError] = useState(null);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'title', label: 'Title' },
    { key: 'status', label: 'Status' },
    { key: 'role', label: 'Role' },
  ];

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const token = '64e2fa0893bcea3fc4a6e48cd2f5a6ec5d68e3fd';
        
        const response = await axios.get('http://localhost:8000/api/main/lecturer/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setLecturers(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : "Error fetching data");
      }
    };

    fetchLecturers();
  }, []);

  if (error) {
    return <div>Error: {error.detail}</div>;
  }

  return (
    <Ad_Table tableHead={columns} tableData={Lecturers} />
  )
}