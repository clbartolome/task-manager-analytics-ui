import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import styled from 'styled-components';
import 'chart.js/auto';
import Loading from './Loading';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #1e1e2f;
  color: #ffffff;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #61dafb;
  margin-bottom: 20px;
`;

const ChartsRow = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;
`;

const ChartContainer = styled.div`
  flex: 1;
  margin: 0 10px;
  background-color: #2e2e3f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const TimeContainer = styled.div`
  background-color: #2e2e3f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin-top: 40px;
`;

const TimeTitle = styled.h2`
  color: #61dafb;
`;

const TimeValue = styled.p`
  font-size: 2em;
  color: #ffffff;
`;

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const statsHost = process.env.REACT_APP_ANALYTICS_URL;
  const statsEndpoint = '/stats';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Wait for 2 seconds before making the API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await axios.get(`${statsHost}${statsEndpoint}`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [statsHost]);

  if (loading) {
    return <Loading />;
  }

  if (!stats) {
    return <div>Error loading stats</div>;
  }

  const barData = {
    labels: ['Total Tasks', 'Completed Tasks', 'Incomplete Tasks'],
    datasets: [
      {
        label: 'Tasks',
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
        data: [stats.total_tasks, stats.completed_tasks, stats.incomplete_tasks],
      },
    ],
  };

  const lineData = {
    labels: Object.keys(stats.completed_by_date),
    datasets: [
      {
        label: 'Tasks Completed by Date',
        borderColor: '#61dafb',
        backgroundColor: 'rgba(97, 218, 251, 0.2)',
        data: Object.values(stats.completed_by_date),
      },
    ],
  };

  const formatTime = (time) => {
    const days = Math.floor(time / 1440);
    const hours = Math.floor((time % 1440) / 60);
    const minutes = Math.floor(time % 60);
    return `${days} days, ${hours} hours, ${minutes} minutes`;
  };

  return (
    <DashboardContainer>
      <Title>Analytics Dashboard</Title>
      <ChartsRow>
        <ChartContainer>
          <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, aspectRatio: 1.5 }} />
        </ChartContainer>
        <ChartContainer>
          <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false, aspectRatio: 1.5 }} />
        </ChartContainer>
      </ChartsRow>
      <TimeContainer>
        <TimeTitle>Average Completion Time</TimeTitle>
        <TimeValue>{formatTime(stats.avg_completion_time)}</TimeValue>
      </TimeContainer>
    </DashboardContainer>
  );
};

export default Dashboard;