
// import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";

import './NavBar.css'

// pages
import Home from "../Pages/Home";
import Blog from "../Pages/Blog";
import Art from "../Pages/Art";
import Tutorials from "../Pages/Tutorials";
import Tools from "../Pages/Tools";
import AboutMe from "../Pages/AboutMe";

import ArtPage from "../ArtPage/ArtPage";
import BlogPage from "../BlogPage/BlogPage";
import PhotoEssay from "../BlogPage/PhotoEssay";
import ToolPage from "../ToolPage/ToolPage";
import TutorialPage from "../TutorialPage/TutorialPage"

import ArtsData from '../../site_data/arts.json';
import BlogPostsData from '../../site_data/blog_posts.json'
import TutorialsData from '../../site_data/tutorials.json'
import ToolsData from '../../site_data/tools.json'

const get_component_name = (name) => {
    let component_name = name.split("_"); // berk_nature --> [berk,nature]
    component_name = component_name.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1); 
    }).join(''); // [berk, nature] --> [Berk,Nature] --> BerkNature
    // console.log(name,component_name);
    return component_name
};

const NavBar = ({ page }) => {
    // add autohide effect
    useEffect(() => {
        let autohide = document.querySelector('.autohide');
        // console.log('autohide');
        // add padding-top to body (if necessary)
        let navbar_height = document.querySelector('.navbar').offsetHeight;
        document.body.style.paddingTop = navbar_height + 'px';
        if (autohide) {
            var last_scroll_top = 0;
            window.addEventListener('scroll', function () {
                let scroll_top = window.scrollY;
                if (scroll_top < last_scroll_top) {
                    autohide.classList.remove('scrolled-down');
                    autohide.classList.add('scrolled-up');
                }
                else {
                    autohide.classList.remove('scrolled-up');
                    autohide.classList.add('scrolled-down');
                }
                last_scroll_top = scroll_top;
            }); // window.addEventListener
        }// if
    }, []);

    return (
        <>
            <Router>
                <nav className="autohide navbar navbar-expand-lg navbar-dark bg-primary nav-div">
                    <div className="container-fluid">
                        <a className="navbar-brand nav-brand" href="/">
                            <img className="brand-img" src="/img/dot.png" height="20px" width="auto" />
                            <p className="brand-text">small data blog</p>
                        </a>
                        <ul className="navbar-nav" style={{ display: 'inline' }}>
                            <li>
                                <Link to="/blog">blog</Link>
                            </li>
                            <li>
                                <Link to="/art">art</Link>
                            </li>
                            <li>
                                <Link to="/tutorials">tutorials</Link>
                            </li>
                            {/* <li>
                                <Link to="/tools">tools</Link>
                            </li> */}
                            <li>
                                <Link to="/about">about</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Routes>
                    <Route exact path="/" element={<Home />} className="nav-item"></Route>
                    <Route exact path="/blog" element={<Blog />}></Route>
                    <Route exact path="/art" element={<Art />}></Route>
                    <Route exact path="/tutorials" element={<Tutorials />}></Route>
                    {/* <Route exact path="/tools" element={<Tools />}></Route> */}
                    <Route exact path="/about" element={<AboutMe />}></Route>
                    {
                        ArtsData.map(category => {
                            return <Route exact path={"/art/" + category.FileName} element={<ArtPage folder={category.FileName} />}></Route>
                        })
                    }
                    {
                        BlogPostsData.map(post => {
                            let blogPostStyle;

                            if (post.PageStyle == 1) {
                                blogPostStyle = <BlogPage componentName={get_component_name(post.FileName)} />
                            }
                            else if (post.PageStyle == 2) {
                                blogPostStyle = <PhotoEssay componentName={get_component_name(post.FileName)} />
                            }
                            return <Route exact path={"/blog/" + post.FileName} element={blogPostStyle}></Route>
                        })
                    }
                    {
                        TutorialsData.map(post => {
                            return <Route exact path={"/tutorials/" + post.FileName} element={<BlogPage componentName={get_component_name(post.FileName)} />}></Route>
                        })
                    }
                    {
                        ToolsData.map(tool => {
                            // console.log('Navbar tool name',get_component_name(tool.FileName))
                            return <Route exact path={"/tools/" + tool.FileName} element={<ToolPage componentName={get_component_name(tool.FileName)} />}></Route>
                        })
                    }
                </Routes>
            </Router>

        </>
    )
}

export default NavBar;