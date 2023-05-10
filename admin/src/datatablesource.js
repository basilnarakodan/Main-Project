export const userColumns=[
    { field: 'id', headerName: 'ID', width: 70 },
    {field:'Company', headerName:'Company', width:200, renderCell:(params)=>{
        return(
            <div className="cellWithImg">
                <img className="cellImg" src={params.row.image} alt="avatar"/>
                {params.row.company}
            </div>
        )
    }},
    { field: 'ctc', headerName: 'CTC', width: 80 },
    { field: 'role', headerName: 'Role', width: 180 },
    // { field: 'location', headerName: 'Location', width: 200 },
    { field: 'branch', headerName: 'Branch', width: 200 },
    { field: 'last_date', headerName: 'Last Date', width: 100 },
]
export const userRows=[
    {
        id: "100",
        company: "Google",
        role: "Product Engineer",
        location: "13A Street, New york",
        ctc: "6 LPA",
        type: "full time",
        experiance: "fresher",
        branch: ["Btech", "MCA", "MBA", "Mtech"],
        job_post_date: "21/04/2022",
        job_post_time: "19:07:48",
        last_date: "22/04/2022",
        last_time: "19:07:48",
        image:"https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg"
    },
    {
        id: "101",
        company: "Facebook",
        role: "Data Analyst",
        location: "Hyderabad",
        ctc: "12 LPA",
        type: "full time",
        experiance: "fresher",
        branch: ["MCA"],
        job_post_date: "21/04/2022",
        job_post_time: "19:07:48",
        last_date: "22/04/2022",
        last_time: "19:07:48",
        image:"https://www.nicepng.com/png/detail/161-1614585_twitter-facebook-instagram-youtube-fb-twitter-youtube-logo.png"
    },
    {
        id: "102",
        company: "Google",
        role: "Product Engineer",
        location: "13A Street, New york",
        ctc: "6 LPA",
        type: "full time",
        experiance: "fresher",
        branch: ["Btech", "MCA", "MBA", "Mtech"],
        job_post_date: "21/04/2022",
        job_post_time: "19:07:48",
        last_date: "22/04/2022",
        last_time: "19:07:48",
        image:"https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg"
    },
    {
        id: "103",
        company: "Facebook",
        role: "Data Analyst",
        location: "Hyderabad",
        ctc: "12 LPA",
        type: "full time",
        experiance: "fresher",
        branch: ["MCA"],
        job_post_date: "21/04/2022",
        job_post_time: "19:07:48",
        last_date: "22/04/2022",
        last_time: "19:07:48",
        image:"https://www.nicepng.com/png/detail/161-1614585_twitter-facebook-instagram-youtube-fb-twitter-youtube-logo.png"
    },
    {
        id: "104",
        company: "Google",
        role: "Product Engineer",
        location: "13A Street, New york",
        ctc: "6 LPA",
        type: "full time",
        experiance: "fresher",
        branch: ["Btech", "MCA", "MBA", "Mtech"],
        job_post_date: "21/04/2022",
        job_post_time: "19:07:48",
        last_date: "22/04/2022",
        last_time: "19:07:48",
        image:"https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg"
    },
    {
        id: "105",
        company: "Facebook",
        role: "Data Analyst",
        location: "Hyderabad",
        ctc: "12 LPA",
        type: "full time",
        experiance: "fresher",
        branch: ["MCA"],
        job_post_date: "21/04/2022",
        job_post_time: "19:07:48",
        last_date: "22/04/2022",
        last_time: "19:07:48",
        image:"https://www.nicepng.com/png/detail/161-1614585_twitter-facebook-instagram-youtube-fb-twitter-youtube-logo.png"
    },
    {
        id: "106",
        company: "Google",
        role: "Product Engineer",
        location: "13A Street, New york",
        ctc: "6 LPA",
        type: "full time",
        experiance: "fresher",
        branch: ["Btech", "MCA", "MBA", "Mtech"],
        job_post_date: "21/04/2022",
        job_post_time: "19:07:48",
        last_date: "22/04/2022",
        last_time: "19:07:48",
        image:"https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg"
    },
    {
        id: "107",
        company: "Facebook",
        role: "Data Analyst",
        location: "Hyderabad",
        ctc: "12 LPA",
        type: "full time",
        experiance: "fresher",
        branch: ["MCA"],
        job_post_date: "21/04/2022",
        job_post_time: "19:07:48",
        last_date: "22/04/2022",
        last_time: "19:07:48",
        image:"https://www.nicepng.com/png/detail/161-1614585_twitter-facebook-instagram-youtube-fb-twitter-youtube-logo.png"
    },
    {
        id: "108",
        company: "Facebook",
        role: "Data Analyst",
        location: "Hyderabad",
        ctc: "12 LPA",
        type: "full time",
        experiance: "fresher",
        branch: ["MCA"],
        job_post_date: "21/04/2022",
        job_post_time: "19:07:48",
        last_date: "22/04/2022",
        last_time: "19:07:48",
        image:"https://www.nicepng.com/png/detail/161-1614585_twitter-facebook-instagram-youtube-fb-twitter-youtube-logo.png"
    },
    {
        id: "109",
        company: "Facebook",
        role: "Data Analyst",
        location: "Hyderabad",
        ctc: "12 LPA",
        type: "full time",
        experiance: "fresher",
        branch: ["MCA"],
        job_post_date: "21/04/2022",
        job_post_time: "19:07:48",
        last_date: "22/04/2022",
        last_time: "19:07:48",
        image:"https://www.nicepng.com/png/detail/161-1614585_twitter-facebook-instagram-youtube-fb-twitter-youtube-logo.png"
    }

]