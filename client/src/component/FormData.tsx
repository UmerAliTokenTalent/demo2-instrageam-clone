import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  name: string;
  fatherName: string;
  country: string;
  address: string;
  gender: string;
  description: string;
  summary: string;
}

interface SavedData extends FormData {
  id: string; // Assuming the server returns an ID for each saved data item
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    fatherName: '',
    country: '',
    address: '',
    gender: '',
    description: '',
    summary: ''
  });

  const [data, setData] = useState<SavedData[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<SavedData>('http://localhost:5000/api/data', formData);
      setData([...data, response.data]);
      setFormData({
        name: '',
        fatherName: '',
        country: '',
        address: '',
        gender: '',
        description: '',
        summary: ''
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<SavedData[]>('http://localhost:5000/api/data');
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Name" 
          className="p-2 border border-gray-300 rounded" 
        />
        <input 
          type="text" 
          name="fatherName" 
          value={formData.fatherName} 
          onChange={handleChange} 
          placeholder="Father Name" 
          className="p-2 border border-gray-300 rounded" 
        />
        <input 
          type="text" 
          name="country" 
          value={formData.country} 
          onChange={handleChange} 
          placeholder="Country" 
          className="p-2 border border-gray-300 rounded" 
        />
        <input 
          type="text" 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
          placeholder="Address" 
          className="p-2 border border-gray-300 rounded" 
        />
        <select 
          name="gender" 
          value={formData.gender} 
          onChange={handleChange} 
          className="p-2 border border-gray-300 rounded">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          placeholder="Description" 
          className="p-2 border border-gray-300 rounded" 
        />
        <textarea 
          name="summary" 
          value={formData.summary} 
          onChange={handleChange} 
          placeholder="Summary" 
          className="p-2 border border-gray-300 rounded" 
        />
        <button 
          type="submit" 
          className="p-2 bg-blue-500 text-white rounded">Save Data</button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Saved Data:</h2>
        <ul>
          {data.map((item, index) => (
            <li key={item.id || index} className="mt-4 p-4 border border-gray-300 rounded">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Father Name:</strong> {item.fatherName}</p>
              <p><strong>Country:</strong> {item.country}</p>
              <p><strong>Address:</strong> {item.address}</p>
              <p><strong>Gender:</strong> {item.gender}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Summary:</strong> {item.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;



