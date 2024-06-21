import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    
    constructor(){
        super();
        // console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
        // console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&apiKey=61654911db7f4519a7abb9dfd8c737bb&page=1&pageSize=${this.props.pageSize}`; //url to fetch api
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    handlePrevClick = async () =>{
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&apiKey=61654911db7f4519a7abb9dfd8c737bb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`; //url to fetch api
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    handleNextClick = async () =>{
        console.log("Next");
        if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&apiKey=61654911db7f4519a7abb9dfd8c737bb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`; //url to fetch api
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        // this.setState({loading: false});
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })
    }
}

  render() {
    // console.log("render")
    return (
      <div className = "container my-3">
        <h1 className="text-center" style={{margin: '35px 0px'}}>GroundNews - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url} >
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl = {element.url}/> 
            {/* Slice can be used if we want to limit the characters in title or descirption like element.title.slice(0,45) */}
        </div>   
        })}

             
        
        </div>
        < div className="container d-flex justify-content-between">  
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News


//Math.ceil returns next largest integer like 4.56 = 5
