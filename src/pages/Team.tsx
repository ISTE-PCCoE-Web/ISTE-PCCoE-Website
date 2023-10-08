//@ts-nocheck
import React from 'react';
import "../components/Team/team.css"
import { Card, TeamCarousel, Navbar, Sponsors, Footer,Loader } from '../components';
import HeadDesign from '../components/Team/HeadDesign';
import dummyData from "../utils/members.json";

import {
    Heading,
    Text
} from "@chakra-ui/react"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { json } from 'stream/consumers';
import { LoaderFunction } from 'react-router-dom';

const coreTeamSortOrder = ["President", "Vice President", "Secretary", "Joint Secretary", "Treasurer", "Co-treasurer",
    "Management Head", "Head Coordinator", "Member"];

const TeamSortOrder = ["Head", "Member"];

interface SortableObject {
    [key: string]: any;
}

function sortByCustomOrder<T extends SortableObject>(
    array: T[],
    property: keyof T,
    customOrder: (keyof T)[]
): T[] {
    return [...array].sort((a, b) => {
        const indexA = customOrder.indexOf(a[property]);
        const indexB = customOrder.indexOf(b[property]);
        return indexA - indexB;
    });
}

export default function Team() {
    const [loading, setloading] = useState(true);

    const [membersData, setmembersData] = useState([]);
    const [coreTeam, setcoreTeam] = useState([]);
    const [codingTeam, setcodingTeam] = useState([]);
    const [webTeam, setwebTeam] = useState([]);
    const [eventTeam, seteventTeam] = useState([]);
    const [DesignTeam, setDesignTeam] = useState([]);
    const [marketingTeam, setmarketingTeam] = useState([]);
    const [supportingTeam, setSupportingTeam] = useState([]);
    const [technicalTeam,setTechnicalTeam]=useState([]);

const populateData=async(ans, v1, v2, v3, v4, v5, v6, v7,v8)=>{
    ans=JSON.parse(ans);
    setloading(true);
    for (const v of ans) {
        if (v.team === undefined) {
          continue;
        } else {
          const teamName = v.team.toUpperCase();
          // console.log(teamName);
          switch (teamName) {
            case 'CORE':
              v1.push(v);
              break;
            case 'CODING':
              v2.push(v);
              break;
            case 'WEB':
              v3.push(v);
              break;
            case 'EVENT MANAGEMENT':
              v4.push(v);
              break;
            case 'DESIGN':
              v5.push(v);
              break;
            case 'SUPPORTING':
              v6.push(v);
              break;
            case 'MARKETING':
              v7.push(v);
              break;
            case 'TECHNICAL':
              v8.push(v);
           
          }
        }
      }
      setloading(false);

    }

    useEffect(() => {
        setloading(true);

        const inLocalStorage = localStorage.getItem("membersData");
        if (!inLocalStorage) {
            setLoading(true);
            fetch("https://us-central1-iste-pccoe.cloudfunctions.net/getTeamData")
                .then((data) => data.json())
                .then((response) => {
                    setmembersData(response);
                    setLoading(false);
                    const v1 = [], v2 = [], v3 = [], v4 = [], v5 = [], v6 = [], v7 = [],v8=[];
                    for (const v of response) {
                        if (v.team === undefined) {
                            continue;
                        }
                        else {
                            const teamName = v.team.toUpperCase();
                            switch (teamName) {
                                case 'CORE':
                                    v1.push(v);
                                    break;
                                case 'CODING':
                                    v2.push(v);
                                    break;
                                case 'WEB':
                                    v3.push(v);
                                    break;
                                case 'EVENT MANAGEMENT':
                                    v4.push(v);
                                    break;
                                case 'DESIGN':
                                    v5.push(v);
                                    break;
                                case 'SUPPORTING':
                                    v6.push(v);
                                    break;
                                case 'MARKETING':
                                    v7.push(v);
                                    break;
                                case 'TECHNICAL':
                                    v8.push(v);

                            }
                        }

                    }
                    setloading(false);
                    setcoreTeam(sortByCustomOrder(v1, 'position', coreTeamSortOrder));
                    setcodingTeam(sortByCustomOrder(v2, 'position', TeamSortOrder));
                    setwebTeam(sortByCustomOrder(v3, 'position', TeamSortOrder));
                    seteventTeam(sortByCustomOrder(v4, 'position', TeamSortOrder));
                    setDesignTeam(sortByCustomOrder(v5, 'position', TeamSortOrder));
                    setSupportingTeam(sortByCustomOrder(v6, 'position', TeamSortOrder));
                    setmarketingTeam(sortByCustomOrder(v7, 'position', TeamSortOrder));
                    setTechnicalTeam(sortByCustomOrder(v8,'position',TeamSortOrder));
                    localStorage.setItem("membersData", JSON.stringify(response));

                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            setloading(true);
            const data = localStorage.getItem("membersData");
            // console.log(JSON.parse(data));
            const newData = JSON.parse(data);
            setloading(false);
            if (codingTeam.length == 0 || eventTeam.length == 0 || supportingTeam.length == 0 || DesignTeam.length == 0 || coreTeam.length == 0 || marketingTeam.length == 0|| technicalTeam.length == 0) {
                populateData(data, coreTeam, codingTeam, webTeam, eventTeam, DesignTeam, supportingTeam, marketingTeam,technicalTeam);
                setcoreTeam(sortByCustomOrder(coreTeam, 'position', coreTeamSortOrder));
                setcodingTeam(sortByCustomOrder(codingTeam, 'position', TeamSortOrder));
                setwebTeam(sortByCustomOrder(webTeam, 'position', TeamSortOrder));
                seteventTeam(sortByCustomOrder(eventTeam, 'position', TeamSortOrder));
                setDesignTeam(sortByCustomOrder(DesignTeam, 'position', TeamSortOrder));
                setSupportingTeam(sortByCustomOrder(supportingTeam, 'position', TeamSortOrder));
                setmarketingTeam(sortByCustomOrder(marketingTeam, 'position', TeamSortOrder));
                setTechnicalTeam(sortByCustomOrder(technicalTeam,'position',TeamSortOrder));
            }
        }

    });

    return (
        loading?(<Loader/>):
        (<div className="teamContainer">
            {/* Team section */}
            <Navbar color="#fff" p="1.5rem 2rem" />
            <section>
                {/* Heading */}
                <HeadDesign teamName="Core" />
                {/* Displaying team members using the Card component */}
                <div className="row">
                    {/* Mapping over membersData to render each member using Card */}
                    {coreTeam.map((member) => (
                        // Rendering the Card component for each member
                        <Card member={member} />
                    ))}
                </div>
                <HeadDesign teamName="Coding" />
                {/* Displaying team members using the Card component */}
                <div className="row">
                    {/* Mapping over membersData to render each member using Card */}
                    {codingTeam.map((member) => (
                        // Rendering the Card component for each member
                        <Card member={member} />
                    ))}
                </div>
                <HeadDesign teamName="Web" />
                {/* Displaying team members using the Card component */}
                <div className="row">
                    {/* Mapping over membersData to render each member using Card */}
                    {webTeam.map((member) => (
                        // Rendering the Card component for each member
                        <Card member={member} />
                    ))}
                </div>
                <HeadDesign teamName="Technical" />
                {/* Displaying team members using the Card component */}
                <div className="row">
                    {/* Mapping over membersData to render each member using Card */}
                    {technicalTeam.map((member) => (
                        // Rendering the Card component for each member
                        <Card member={member} />
                    ))}
                </div>
                <HeadDesign teamName="Event Management" />
                {/* Displaying team members using the Card component */}
                <div className="row">
                    {/* Mapping over membersData to render each member using Card */}
                    {eventTeam.map((member) => (
                        // Rendering the Card component for each member
                        <Card member={member} />
                    ))}
                </div>
                <HeadDesign teamName="Design" />
                {/* Displaying team members using the Card component */}
                <div className="row">
                    {/* Mapping over membersData to render each member using Card */}
                    {DesignTeam.map((member) => (
                        // Rendering the Card component for each member
                        <Card member={member} />
                    ))}
                </div>
                <HeadDesign teamName="Marketing" />
                {/* Displaying team members using the Card component */}
                <div className="row">
                    {/* Mapping over membersData to render each member using Card */}
                    {marketingTeam.map((member) => (
                        // Rendering the Card component for each member
                        <Card member={member} />
                    ))}
                </div>
                <HeadDesign teamName="Support" />
                {/* Displaying team members using the Card component */}
                <div className="row">
                    {/* Mapping over membersData to render each member using Card */}
                    {supportingTeam.map((member) => (
                        // Rendering the Card component for each member
                        <Card member={member} />
                    ))}
                </div>
            </section>
                <Footer/>
        </div>)
    )
}
