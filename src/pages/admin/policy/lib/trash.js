import React, { useState, useEffect } from "react";

const TrashPolicy = () => {
  const [trashedPolicies, setTrashedPolicies] = useState([]);

  useEffect(() => {
    // Fetch trash data
    fetch("/api/policies/trash")
      .then(response => response.json())
      .then(data => setTrashedPolicies(data))
      .catch(error => console.error("Error fetching trashed policies:", error));
  }, []);

  return (
    <div>
      <h2>Trashed Policies</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trashedPolicies.map(policy => (
            <tr key={policy.id}>
              <td>{policy.title}</td>
              <td>{policy.slug}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => restorePolicy(policy.id)}>Restore</button>
                <button className="btn btn-danger btn-sm" onClick={() => permanentlyDeletePolicy(policy.id)}>Delete Permanently</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function restorePolicy(id) {
    fetch(`/api/policies/restore/${id}`, { method: "POST" })
      .then(() => setTrashedPolicies(trashedPolicies.filter(policy => policy.id !== id)))
      .catch(error => console.error("Error restoring policy:", error));
  }

  function permanentlyDeletePolicy(id) {
    fetch(`/api/policies/${id}`, { method: "DELETE" })
      .then(() => setTrashedPolicies(trashedPolicies.filter(policy => policy.id !== id)))
      .catch(error => console.error("Error permanently deleting policy:", error));
  }
};

export default TrashPolicy;
