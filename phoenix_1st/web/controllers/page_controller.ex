defmodule Phoenix1st.PageController do
  use Phoenix1st.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
