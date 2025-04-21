import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import analyticsService from "../../functionservice/analystService";

const AnalyticsForm = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchAnalytics = async () => {
    try {
      const data = await analyticsService.getAnalytics(startDate, endDate);
      setAnalyticsData(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu thống kê:", error);
    }
  };

  const handleSearch = () => {
    fetchAnalytics();
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div>
      <h3>Thống kê truy cập trang</h3>
      <Form className="mb-3">
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Ngày bắt đầu</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Ngày kết thúc</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button variant="primary" className="mt-4" onClick={handleSearch}>
              <FaSearch /> Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Trang</th>
            <th>Lượt xem</th>
            <th>Khách duy nhất</th>
          </tr>
        </thead>
        <tbody>
          {analyticsData.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            analyticsData.map((data) => (
              <tr key={data.id}>
                <td>{new Date(data.date).toLocaleDateString("vi-VN")}</td>
                <td>{data.pageName}</td>
                <td>{data.pageViews}</td>
                <td>{data.uniqueVisitors}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AnalyticsForm;
