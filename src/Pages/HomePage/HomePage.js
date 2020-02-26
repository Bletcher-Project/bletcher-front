import React, { Component } from "react";

import { NavBar, Post } from "../../Components";

const defaultProps = {};
const propTypes = {};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          isMyPost: true,
          posterProfile:
            "data:image/jpeg;base64,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",
          posterName: "Munch",
          posterType: 0,
          postImg:
            "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg",
          postContent: "Scream",
          postHashTags: ["munch", "scream"],
          postDate: "2020-02-19 17:00:00",
          postLike: 135440,
          postComments: [
            { author: "Jay", comment: "what a masterpiece! " },
            { author: "Jay", comment: "what a masterpiece! " },
            { author: "Jay", comment: "what a masterpiece! " },
            { author: "Jay", comment: "what a masterpiece! " },
            { author: "Jay", comment: "what a masterpiece! " }
          ]
        },
        {
          posterProfile: "",
          posterName: "Jessica",
          posterType: 1,
          postImg:
            "https://i.pinimg.com/236x/85/dd/bc/85ddbc7ee50d1a0aaef6dde432edd58a.jpg",
          postContent: "nightmare",
          postHashTags: ["dark", "night"],
          postDate: "2020-02-15 13:00:00",
          postComments: [
            { author: "Endrew", comment: "good good" },
            { author: "Jay", comment: "niceee!" },
            { author: "Jay", comment: "niceee!" }
          ]
        },
        {
          posterProfile: "",
          posterName: "James",
          posterType: 1,
          postImg:
            "https://d2.alternativeto.net/dist/s/deepart-io_231167_full.jpg?format=jpg&width=1600&height=1600&mode=min&upscale=false",
          postContent: "papers + person",
          postHashTags: ["paper", "person", "deep"],
          postDate: "2020-02-20 13:00:00",
          postComments: [
            { author: "Endrew", comment: "good job" },
            { author: "Sdi_dk", comment: "awesome" }
          ]
        },
        {
          posterProfile:
            "https://t1.daumcdn.net/cfile/tistory/247DFA4358B1426A31",
          posterName: "Amy",
          posterType: 1,
          postImg:
            "https://m.picturemall.co.kr/web/product/big/201709/312_shop1_419834.jpg",
          postContent: "afternoon",
          postHashTags: ["cloud", "peace"],
          postDate: "2020-02-18 16:00:00",
          postComments: [
            { author: "Endrew", comment: "good job" },
            { author: "Sdi_dk", comment: "awesome" }
          ]
        },
        {
          posterProfile:
            "https://i.pinimg.com/originals/d4/1f/2b/d41f2bc603ac163db6fb22ddf03a8d3a.jpg",
          posterName: "Mone",
          posterType: 0,
          postImg:
            "https://post-phinf.pstatic.net/MjAxODExMDFfMjQ0/MDAxNTQxMDc1OTYxNTQ1.swIFGuyl3AYqIIXURgGUzwhcfcHuPKQSGEqALrLXvJog.z-H2r8p-xtUxUYeJy9dqMx4QSezkf0jNwznlYr3gIhIg.JPEG/%EB%AA%A8%EB%84%A4_%EC%95%84%EB%A5%B4%EC%9E%A5%ED%87%B4%EC%9C%A0%EC%9D%98_%EC%96%91%EA%B7%80%EB%B9%84%EA%BD%83%281873%29.JPG?type=w1200",
          postContent: "flowers",
          postHashTags: ["flower", "sunny"],
          postDate: "2020-02-10 13:00:00",
          postComments: [
            { author: "Endrew", comment: "good job" },
            { author: "Sdi_dk", comment: "awesome" }
          ]
        }
      ]
    };
  }

  render() {
    const posts = this.state.posts;
    return (
      <div className="homePage">
        <NavBar />
        {posts.map(post => (
          <Post
            className="homePage__post mb-2 mt-2"
            isMyPost={post.isMyPost}
            posterName={post.posterName}
            posterProfile={post.posterProfile}
            posterType={post.posterType}
            postContent={post.postContent}
            postHashTags={post.postHashTags}
            postImg={post.postImg}
            postDate={post.postDate}
            postLike={post.postLike}
            postComments={post.postComments}
          />
        ))}
      </div>
    );
  }
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default HomePage;
