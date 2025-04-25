import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import videoService from "../../../functionservice/videoService";
import CreateVideoModal from "./createmodal";
import EditVideoModal from "./editmodal";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await videoService.getAllVideos();
      setVideos(data);
    } catch (error) {
      console.error("Failed to fetch videos", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await videoService.deleteVideo(id);
      setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedVideo) => {
    const updated = videos.map((v) =>
      v.id === updatedVideo.id ? { ...v, ...updatedVideo } : v
    );
    setVideos(updated);
  };

  const handleSaveCreate = (newVideo) => {
    setVideos((prev) => [...prev, newVideo]);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Danh sách Video</h3>
        <Button variant="success" onClick={() => setShowCreateModal(true)}>
          Thêm video
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Link YouTube</th>
            <th>Ngày tạo</th>
            <th>Ngày cập nhật</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.tieuDe}</td>
              <td>
                <a href={video.linkYtb} target="_blank" rel="noreferrer">
                  {video.linkYtb}
                </a>
              </td>
              <td>{new Date(video.createdAt).toLocaleString()}</td>
              <td>{new Date(video.updatedAt).toLocaleString()}</td>
              <td className="d-flex gap-2 mt-2"> 
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(video)}
                  className="me-2"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(video.id)}
                  className="me-2"
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal thêm video */}
      <CreateVideoModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveCreate}
      />

      {/* Modal chỉnh sửa video */}
      <EditVideoModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
        initialData={selectedVideo}
      />
    </div>
  );
};

export default VideoList;
