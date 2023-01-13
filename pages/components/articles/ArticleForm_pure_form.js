
export default function ArticleForm({category}) {
    return (
        <div className="conatainer">
            <h1>글 작성하기</h1>

            <form>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">제목</label>
                    <inpu type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">내용</label>
                    <textarea name="" id="" cols="30" rows="10" className="form-control" />
                </div>  
                <button type="submit" className="btn btn-primary">전송</button>
            </form>
        </div>
    )
}