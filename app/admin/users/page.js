'use client';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import './admin.css';

export default function Page() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users');
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

    getUsers();
    const interval = setInterval(getUsers, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ DELETE handler
  const handleDelete = async (id) => {
    const confirmDelete = confirm(`Are you sure you want to delete user with ID ${id}?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setItems((prev) => prev.filter((user) => user.id !== id));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <br /><br /><br /><br />
      <div className="container">
        <div className="card">
          <div className="card-header">Users List</div>
          <div className="card-body">
            <div className="row">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className='text-center'>#</th>
                    <th>Firstname</th>
                    <th>Fullname</th>
                    <th>Lastname</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className='text-center'>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.fullname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.username}</td>
                      <td>{item.password}</td>
                      <td>
                        <Link href={`/admin/edit/${item.id}`} className="btn btn-warning">
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
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
