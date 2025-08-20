'use client';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './admin.css'; 
export default function Page() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {

    async function getUsers() {
      try {
        const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users');
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
  getUsers()
  const interval  = setInterval(getUsers, 1000);
  return () => clearInterval(interval);
}, []);

const handleDelete = async (id) => {
  //console.log('user id :', id);
  try {
    const res = await fetch(`https://backend-nextjs-virid.vercel.app/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        Accept : 'application/json',
      },
    });
    const result = await res.json();
    console.log(result);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}; //end handleDelete

  return (
    <>
    <br /><br /><br /><br />
    <div className="container">
      <div class="card">
  <div class="card-header">
    Users List
  </div>
  <div class="card-body">
  <div className="row">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className='col-md-1 text-center'>#</th>
            <th className='col-md-2'>คำนำหน้า</th>
            <th className='col-md-4'>ชื่อจริง</th>
            <th className='col-md-4'>นามสกุล</th>
            <th className='col-md-1'>Eidt</th>
            <th className='col-md-1'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className='text-center'>{item.id}</td>
              <td>{item.firstname}</td>
              <td>{item.fullname}</td>
              <td>{item.lastname}</td>
              <td><Link href={`/admin/users/edit/${item.id}`} className="btn btn-warning">Edit</Link></td>
              <td><button className="btn btn-pill btn-danger" type="button" onClick={() => handleDelete(item.id)}><i class="fa fa-trash"></i>Del</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

    </div>
    </div>
    <br /><br />

    </>
  );
}