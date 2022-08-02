import Layout from "../../components/layout";

const Features = () => {
    return (
        <Layout>
            <div className="container px-4 py-5" id="icon-grid">
                <h2 className="pb-2 border-bottom">Icon grid</h2>
    
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                    <div className="col d-flex align-items-start">
                        <svg className="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlinkHref="#bootstrap"></use></svg>
                        <div>
                        <h4 className="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start">
                        <svg className="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlinkHref="#cpu-fill"></use></svg>
                        <div>
                        <h4 className="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start">
                        <svg className="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlinkHref="#calendar3"></use></svg>
                        <div>
                        <h4 className="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start">
                        <svg className="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlinkHref="#home"></use></svg>
                        <div>
                        <h4 className="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start">
                        <svg className="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlinkHref="#speedometer2"></use></svg>
                        <div>
                        <h4 className="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start">
                        <svg className="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlinkHref="#toggles2"></use></svg>
                        <div>
                        <h4 className="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start">
                        <svg className="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlinkHref="#geo-fill"></use></svg>
                        <div>
                        <h4 className="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start">
                        <svg className="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlinkHref="#tools"></use></svg>
                        <div>
                        <h4 className="fw-bold mb-0">Featured title</h4>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Features;