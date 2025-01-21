import { Link } from 'react-router-dom';

const Breadcrumb = ({ pageName, backPage, backPageLink }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-[1.3rem] font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2 text-[0.8rem] font-normal">
          <li>
            <Link className="text-black_sub" to="/">
              Trang chủ /
            </Link>
          </li>
          {backPage && backPageLink && (
            <li className="text-black_sub">
              <Link className="" to={backPageLink}>
                {backPage} /
              </Link>
            </li>
          )}

          <li className=" text-blue_main_sub">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
