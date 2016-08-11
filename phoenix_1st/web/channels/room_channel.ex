defmodule Phoenix1st.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    IO.puts "Someone has join to room:lobby"
    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("new_msg", %{"name" => name, "body" => body}, socket) do
    IO.puts "Someone send a message:"  <> body
    broadcast! socket, "new_msg", %{name: name, body: body}
    {:noreply, socket}
  end

  def handle_out("new_msg", payload, socket) do
    # IO.puts "Someone push a message:" <> payload
    push socket, "new_msg", payload
    {:noreply, socket}
  end
end
