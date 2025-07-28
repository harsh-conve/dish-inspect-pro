import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material';
import {
  School,
  AccountCircle,
  TrendingUp,
  TrendingDown,
  Assessment,
  CompareArrows,
} from '@mui/icons-material';

interface SubjectPerformance {
  subject: string;
  marks: number;
  grade: string;
  percentage: number;
}

interface YearComparison {
  subject: string;
  currentYear: number;
  lastYear: number;
  improvement: number;
}

const AcademicLogin = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock data for 2024-2025 performance
  const performance2024: SubjectPerformance[] = [
    { subject: 'Mathematics', marks: 85, grade: 'A', percentage: 85 },
    { subject: 'Physics', marks: 78, grade: 'B+', percentage: 78 },
    { subject: 'Chemistry', marks: 82, grade: 'A-', percentage: 82 },
    { subject: 'Biology', marks: 88, grade: 'A', percentage: 88 },
    { subject: 'English', marks: 75, grade: 'B+', percentage: 75 },
    { subject: 'Computer Science', marks: 92, grade: 'A+', percentage: 92 },
  ];

  // Mock data for 2025-2026 comparison
  const comparison2025: YearComparison[] = [
    { subject: 'Mathematics', currentYear: 88, lastYear: 85, improvement: 3 },
    { subject: 'Physics', currentYear: 82, lastYear: 78, improvement: 4 },
    { subject: 'Chemistry', currentYear: 79, lastYear: 82, improvement: -3 },
    { subject: 'Biology', currentYear: 91, lastYear: 88, improvement: 3 },
    { subject: 'English', currentYear: 80, lastYear: 75, improvement: 5 },
    { subject: 'Computer Science', currentYear: 95, lastYear: 92, improvement: 3 },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId && password && academicYear) {
      setIsLoggedIn(true);
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'success';
    if (grade.includes('B')) return 'primary';
    return 'warning';
  };

  const getImprovementIcon = (improvement: number) => {
    return improvement > 0 ? <TrendingUp color="success" /> : <TrendingDown color="error" />;
  };

  if (!isLoggedIn) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
            <School sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h4" component="h1" color="primary">
              Academic Portal
            </Typography>
          </Box>
          
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              margin="normal"
              required
              InputProps={{
                startAdornment: <AccountCircle sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Academic Year</InputLabel>
              <Select
                value={academicYear}
                label="Academic Year"
                onChange={(e) => setAcademicYear(e.target.value)}
              >
                <MenuItem value="2024-2025">2024-2025</MenuItem>
                <MenuItem value="2025-2026">2025-2026</MenuItem>
              </Select>
            </FormControl>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              size="large"
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <School sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" component="h1" color="primary">
            Academic Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Academic Year: {academicYear}
          </Typography>
        </Box>
      </Box>

      {academicYear === '2024-2025' && (
        <Card elevation={2}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Assessment sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Last Academic Performance
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {performance2024.map((subject, index) => (
                <Box key={index} sx={{ flex: '1 1 calc(50% - 12px)', minWidth: '280px' }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {subject.subject}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h4" sx={{ mr: 2 }}>
                          {subject.marks}
                        </Typography>
                        <Chip
                          label={subject.grade}
                          color={getGradeColor(subject.grade) as any}
                          size="small"
                        />
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={subject.percentage}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                        {subject.percentage}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Overall Performance Summary
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Average Score: {Math.round(performance2024.reduce((sum, item) => sum + item.marks, 0) / performance2024.length)}%
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      {academicYear === '2025-2026' && (
        <Card elevation={2}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CompareArrows sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Year-over-Year Comparison
              </Typography>
            </Box>
            
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Subject</strong></TableCell>
                    <TableCell align="center"><strong>Current Year (2025-26)</strong></TableCell>
                    <TableCell align="center"><strong>Last Year (2024-25)</strong></TableCell>
                    <TableCell align="center"><strong>Improvement</strong></TableCell>
                    <TableCell align="center"><strong>Trend</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {comparison2025.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.subject}
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6" color="primary">
                          {row.currentYear}%
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1">
                          {row.lastYear}%
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`${row.improvement > 0 ? '+' : ''}${row.improvement}%`}
                          color={row.improvement > 0 ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        {getImprovementIcon(row.improvement)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Card variant="outlined" sx={{ textAlign: 'center', p: 2, flex: '1 1 200px' }}>
                <Typography variant="h6" color="success.main">
                  Improved Subjects
                </Typography>
                <Typography variant="h4">
                  {comparison2025.filter(item => item.improvement > 0).length}
                </Typography>
              </Card>
              <Card variant="outlined" sx={{ textAlign: 'center', p: 2, flex: '1 1 200px' }}>
                <Typography variant="h6" color="error.main">
                  Declined Subjects
                </Typography>
                <Typography variant="h4">
                  {comparison2025.filter(item => item.improvement < 0).length}
                </Typography>
              </Card>
              <Card variant="outlined" sx={{ textAlign: 'center', p: 2, flex: '1 1 200px' }}>
                <Typography variant="h6" color="primary.main">
                  Average Improvement
                </Typography>
                <Typography variant="h4">
                  +{Math.round(comparison2025.reduce((sum, item) => sum + item.improvement, 0) / comparison2025.length)}%
                </Typography>
              </Card>
            </Box>
          </CardContent>
        </Card>
      )}
      
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => setIsLoggedIn(false)}
          size="large"
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default AcademicLogin;