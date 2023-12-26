import NestedList from "@/components/dashboard-page/NestedList";
import CoursesList from "@/components/dashboard-page/CoursesList";
import StudentIdDataTable from "@/components/admin/utils/StudentIdTable";
import Tabs from "@/components/class/teacher/TeacherTabs";
import {
  Button,
  CssBaseline,
  Popper,
  Fade,
  Paper,
  Divider,
  Typography,
  List,
  Toolbar,
  Fab,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

const NotificationPanel = ({ notifications }) => (
  <Popper
    open={Boolean(notifications)}
    anchorEl={notifications}
    placement="bottom-end"
    transition
  >
    {({ TransitionProps }) => (
      <Fade {...TransitionProps} timeout={350}>
        <Paper>
          <List>
            {notifications &&
              notifications.map((notification, index) => (
                <div key={index} className="px-4 py-2 hover:bg-gray-100">
                  <Typography variant="body1">
                    {notification.message}
                  </Typography>
                </div>
              ))}
          </List>
        </Paper>
      </Fade>
    )}
  </Popper>
);

const TeacherClass = ({
  currentSelection,
  studentClass,
  teacherClass,
  id,
  role,
  tabs,
  socket,
}) => {
  const [currentSocket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState(null);
  useEffect(() => {
    if (socket) {
      setSocket(socket);
      socket.on("getNotification", (data) => {
        setNotifications((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  const handleNoti = () => {
    socket.emit("sendNotification", {
      senderId: 3,
      receiverId: id,
      type: "GUI ROI do",
    });
  };

  return (
    <Box sx={{ marginLeft: "240px", backgroundColor: "white", height: "100%" }}>
      {currentSelection === "Home" && (
        <div>
          <NestedList name="Student Class">
            <CoursesList classData={studentClass} socket={currentSocket} />
          </NestedList>

          <NestedList name="Teacher Class">
            <CoursesList classData={teacherClass} socket={currentSocket} />
          </NestedList>
        </div>
      )}
      {currentSelection === "MapID" && <StudentIdDataTable />}
      {currentSelection === "Registered" && <div>Registered Content</div>}
      {currentSelection === "Archived class" && (
        <div>Archived Class Content Here</div>
      )}
      {currentSelection === "Setting" && <div>Settings Content Here</div>}
      {currentSelection === "Tabs" && (
        <Tabs classId={id} role={role} tabs={tabs} socket={currentSocket} />
      )}
      <Button style={{ color: "blue" }} type="primary" onClick={handleNoti}>
        NOTIFICATION
      </Button>
      <NotificationPanel notifications={notifications} />
    </Box>
  );
};

export default TeacherClass;
