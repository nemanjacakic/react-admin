import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import queryString from "query-string";

import { setPageLoading } from "~/store/reducers/app";
import { getAll } from "~/store/reducers/users";

export default function useUsersGrid() {
  const dispatch = useDispatch();
  const history = useHistory();

  let [ gridFilters, setGridFilters ] = useState({
    page: 1,
    itemsPerPage: 10,
    sortBy: "id",
    sortAsc: true
  });

  const normalizeUrlFilters = (urlFilters) => {
    let componentFilters = {};

    if ( urlFilters.itemsPerPage ) {
      componentFilters.itemsPerPage = Number(urlFilters.itemsPerPage);
    }

    if ( urlFilters.page ) {
      componentFilters.page = Number(urlFilters.page);
    }

    if ( urlFilters.sortBy ) {
      componentFilters.sortBy = urlFilters.sortBy;
    }

    if ( urlFilters.sortDesc ) {
      componentFilters.sortAsc = urlFilters.sortDesc === "true" ? false : true ;
    }

    return componentFilters;
  };

  const handlePerRowsChange = (itemsPerPage) => {
    setGridFilters({
      ...gridFilters,
      itemsPerPage
    });

    let filters = {
      ...queryString.parse(location.search),
      itemsPerPage
    };

    history.push({
      search: queryString.stringify(filters)
    });

    dispatch(getAll(filters));
  };

  const handlePageChange = (page) => {
    setGridFilters({
      ...gridFilters,
      page
    });

    let filters = {
      ...queryString.parse(location.search),
      page
    };

    history.push({
      search: queryString.stringify(filters)
    });

    dispatch(getAll(filters));
  };

  const handleSortChange = (field, type) => {
    setGridFilters({
      ...gridFilters,
      sortBy: field.selector,
      sortAsc: type === "asc" ? true : false
    });

    let filters = {
      ...queryString.parse(location.search),
      sortBy: field.selector,
      sortDesc: type === "desc" ? true : false
    };

    history.push({
      search: queryString.stringify(filters)
    });

    dispatch(getAll(filters));
  };

  useEffect(() => {
    let filters = { ...queryString.parse(location.search) };

    setGridFilters({
      ...gridFilters,
      ...normalizeUrlFilters(filters)
    });

    dispatch(setPageLoading(true));
    dispatch(getAll(filters)).finally(() => dispatch(setPageLoading(false)));
  }, []);

  return {
    gridFilters,
    handlePerRowsChange,
    handlePageChange,
    handleSortChange
  };

}
