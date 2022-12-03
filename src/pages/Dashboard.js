import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Link,
  Breadcrumbs,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  //LinearProgress,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Chart from "react-apexcharts";
import format from "date-fns/format";
import { useSelector } from "react-redux";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Groups2Icon from '@mui/icons-material/Groups2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FeedIcon from '@mui/icons-material/Feed';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 20,
  width: "100%",
 
}));

export default function Dashboard() {
    const ui = useSelector((state) => state.ui);
    const user = useSelector((state) => state.user);
    const [total, setTotal] = useState(0);
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    
      
  useEffect(() => {
    var rows = [0];
    // let pro = 0;
    for (let i = 0; i < user.finances.length; i++) {
      rows = user.finances.map((finance) => (finance.Total));
    //   console.log(pro);
    //   rows.push(pro);
    }
    setTotal(rows.reduce(reducer));

  
    // console.log(urlId);
    // console.log(location.state.quantity);
    // console.log("row",rows.reduce(reducer))
  }, [total, user,]);

  const [optionsLine] = useState({
    chart: {
      id: "apexchart",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      toolbar: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    grid: {
      show: false,
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: undefined,
      width: 2,
      dashArray: 0,
    },
    colors: ["#FF0000", "#E91E63"],
    tooltip:{
        theme: ui.isDarkMode === true ? "light" : "dark",
    }
  });

  const [optionsRadialBar] = useState({
    plotOptions: {
      radialBar: {
        track: {
          opacity: 0.5,
        },
        dataLabels: {
            
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return user.users.length;
              
            },
            
          },
        
         
        },
      },
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors:  ui.isDarkMode === true ? "black" : "white",
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },

    stroke: {
      lineCap: "round",
    },
    labels: ["Counselor", "Facilitator", "Student", ],
  });

  const [optionsArea] = useState({
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "Month",
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      labels: {
          style:{
        colors:  ui.isDarkMode === true ? "gray" : "gray",
          }
      }
    },
   
  

    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "top",
      horizontalAlign: "right",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors:  ui.isDarkMode === true ? "black" : "white",
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },

    grid: {
      borderColor: "#90A4AE",
      strokeDashArray: 10,

      yaxis: {
        lines: {
          show: false,
        },

        labels: {
            style:{
          colors:  ui.isDarkMode === true ? "gray" : "gray",
            }
        }
      },
    },

    colors: ["#5DDC9A", "#E91E63"],
    tooltip:{
      
        theme: ui.isDarkMode === true ? "light" : "dark",

    }
  });

  const [series] = useState([
    {
      name: "series-1",
      data: [30, 20, 50, 10, 30],
    },
  ]);
  const [seriesRadialBar] = useState([user.users.filter(i => i.UserType === "Counselor").length , user.users.filter(i => i.UserType === "Facilitator").length, user.users.filter(i => i.UserType === "Student").length]);
  const [seriesArea] = useState([
    {
      name: "Total Assesment",
      data: [
        user.forms.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "January").length,
        user.forms.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "February").length,
        user.forms.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "March").length,
        user.forms.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "April").length,
        user.forms.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "May").length,
        user.forms.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "June").length,
        user.forms.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "July").length,
        user.forms.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "August").length,
        user.forms.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "September").length,
        user.forms.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "October").length,
        user.forms.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "November").length,
        user.forms.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "December").length,
       
      
    ],
      
    },
    {
      name: "Total Counseling",
      data: [

        user.appointments.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "January").length,
        user.appointments.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "February").length,
        user.appointments.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "March").length,
        user.appointments.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "April").length,
        user.appointments.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "May").length,
        user.appointments.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "June").length,
        user.appointments.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "July").length,
        user.appointments.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "August").length,
        user.appointments.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "September").length,
        user.appointments.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "October").length,
        user.appointments.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "November").length,
        user.appointments.filter(i => format(new Date((i.Created.seconds*1000)), 'MMMM')  === "December").length,
      ],
    },
  ]);
  return (
    <Box sx={{mx: {lg:4, xs:2}, mt:12}}>


      <Breadcrumbs sx={{ mb: 2 }} separator={<Box sx={{width: 4, height: 4, bgcolor:"gray", borderRadius: '50%' }}/>}>
        <Link underline="hover" color="inherit" href="/seller">
        <Typography color="text.primary" variant="body2" >Home</Typography>
        </Link>
        <Typography color="text.primary" variant="body2" >Dashboard</Typography>
      </Breadcrumbs>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Item>
            <Card sx={{ display: "flex", boxShadow: 0 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="subtitle1">Total Student</Typography>
                  <Typography
                    variant="h3"
                    color="secondary"
                    sx={{ fontWeight: 700 }}
                  >
                    { user.users.filter(i => i.UserType === "Student").length }
                  </Typography>
                </CardContent>
               
              </Box>

              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  width: 200,
                }}
              >
                    <Groups2Icon color="primary" sx={{fontSize: 140, }}/>
              </Box>
            </Card>
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Item>
            <Card sx={{ display: "flex", boxShadow: 0 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="subtitle1">Total Assesment</Typography>
                  <Typography
                    variant="h3"
                    color="secondary"
                    sx={{ fontWeight: 700 }}
                  >
                    {user.forms.length}
                  </Typography>
                </CardContent>
         
              </Box>

              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  width: 200,
                }}
              >
            <FeedIcon color="primary" sx={{fontSize: 140, }}/>
              </Box>
            </Card>
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Item>
            <Card sx={{ display: "flex", boxShadow: 0 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="subtitle1">Total Counseling</Typography>
                  <Typography
                    variant="h3"
                    color="secondary"
                    sx={{ fontWeight: 700 }}
                  >
                   {user.appointments.length}
                  </Typography>
                </CardContent>
         
              </Box>

              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  width: 200,
                }}
              >
                <CalendarMonthIcon color="primary" sx={{fontSize: 140, }}/>
              </Box>
            </Card>
          </Item>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Item>
            <Typography
              color="textPrimary"
              sx={{ textAlign: "left", ml: 1, fontWeight: 600, my: 1 }}
            >
             Total User
            </Typography>
            <Chart
              options={optionsRadialBar}
              series={seriesRadialBar}
              type="radialBar"
              height={395}
            />
          </Item>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Item>
            <Typography
              color="textPrimary"
              sx={{ textAlign: "left", ml: 1, fontWeight: 600, my: 1 }}
            >
              Monthly Student
            </Typography>
            <Chart
              options={optionsArea}
              series={seriesArea}
              type="area"
              height={350}
            />
          </Item>
        </Grid>
       
      </Grid>
    </Box>
  );
}
