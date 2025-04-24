import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import CreateVideoModal from "./createmodal";
import EditVideoModal from "./editmodal";
import { useNavigate } from "react-router-dom";
import videoService from "../../../functionservice/videoService";

const VideoList = () => {
  const [videos, setVideos] = useState([]); 
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const videoData = await videoService.getAllVideos();
      setVideos(Array.isArray(videoData.videos) ? videoData.videos : []);
      console.log(videoData);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await videoService.deleteVideo(id);
      const filteredVideos = videos.filter((video) => video.id !== id);
      setVideos(filteredVideos);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleEdit = (video) => {
    console.log("Editing video with ID:", video.id);  // Check if id is being passed
    setSelectedVideo(video);
    setShowEditModal(true);
  };

  const handleSave = async (updatedVideo) => {
    console.log("Saving video with data:", updatedVideo);
    try {
      const savedVideo = await videoService.editVideo(updatedVideo.id, updatedVideo);
      console.log("Video saved successfully:", savedVideo);
      setVideos((prevVideos) =>
        prevVideos.map((video) => (video.id === savedVideo.id ? savedVideo : video))
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Error saving video:", error);
      if (error.response) {
        console.error("Error details:", error.response.data);
      }
    }
  };

  const handleSaveCreate = async (newVideo) => {
    try {
      const savedVideo = await videoService.createVideo(newVideo);
      setVideos((prev) => [...prev, savedVideo]);
    } catch (error) {
      console.error("Error saving video:", error);
    }
  };

  const handleOpenTrash = () => {
    navigate("/admin/video/trash");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Danh sách Video</h3>
        <div className="d-flex gap-2">
          <Button variant="success" onClick={() => setShowCreateModal(true)}>
            Thêm video
          </Button>
          <Button variant="danger" onClick={handleOpenTrash}>
            <i className="bi bi-trash"> thùng rác</i>
          </Button>
        </div>
      </div>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Link YouTube</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={`${video.id}-${video.tieuDe}`}>
              <td>{video.tieuDe}</td>
              <td>
                <a href={video.linkYtb} target="_blank" rel="noopener noreferrer">
                  {video.linkYtb}
                </a>
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(video)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(video.id)}
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
        onSave={handleSave}
        initialData={selectedVideo}
      />
    </div>
  );
};

export default VideoList;
