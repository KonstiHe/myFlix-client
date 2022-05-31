<Route path="/directors/:name" render={({ match, history }) => {
    if (movies.length === 0) return <div className="main-view" />;
    return <Col md={8}>
        <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
    </Col>
}
} />