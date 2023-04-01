import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DnDButton from "@/components/DnDButton";
import api from "@/lib/api";

const Home = () => {
  const navigate = useNavigate();

  const [generateImages, setGenerateImages] = useState(false);
  const [roomId, setRoomId] = useState("");

  const createRoom = () => {
    api.createRoom({ generateImages }).then((res) => {
      navigate(`/lobby/${res.data.conversationId}`, { state: res.data });
    });
  };

  const joinRoom = () => {
    api.joinRoom({ link: roomId }).then((res) => {
      navigate(`/lobby/${res.data.conversationId}`, { state: res.data });
    });
  };

  return (
    <div className="flex items-center justify-center h-[90vh] mx-10 my-10">
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <div className="md:flex-1" />
      <div className="flex-1 bg-beige-light h-full max-w-full p-10">
        <div className="border-2 border-beige-dark items-center flex flex-col justify-start h-full rounded-2xl">
          <p className="text-4xl text-center mt-10 md:mt-20">FAST DND</p>

          <div className="max-w-full w-11/12 h-[1px] bg-beige-dark mt-5 xl:mt-10" />

          <div className="flex justify-center items-center mt-5 xl:mt-10 gap-2">
            <input
              type="checkbox"
              id="withPictures"
              className="w-5 h-5 accent-black"
              onChange={(e) => setGenerateImages(e.target.checked)}
            />
            <label htmlFor="withPictures" className="xs:text-sm md:text-4xl whitespace-nowrap">
              With Pictures
            </label>
          </div>

          <div id="g_id_onload"
            data-client_id="695030285071-oc4e483rn2791srvc7tep6a0dto8ltkr.apps.googleusercontent.com "
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="https://api-dev.fastdnd.net/v1/google/login"
            data-nonce=""
            data-auto_prompt="false">
          </div>

          <div class="g_id_signin"
            data-type="standard"
            data-shape="pill"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left">
          </div>

          <div className="max-w-full w-11/12 h-[1px] bg-beige-dark mt-5 xl:mt-10" />

          <div className="mt-5 xl:mt-10 flex justify-center">
            <DnDButton onClick={createRoom}>Create Room</DnDButton>
          </div>

          <div className="max-w-full w-11/12 h-[1px] bg-beige-dark mt-5 xl:mt-10" />

          <div className="my-5 xl:my-10 flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2">
              <label htmlFor="roomId" className="text-lg md:text-4xl whitespace-nowrap">
                Room ID
              </label>
              <div>
                <input
                  type="text"
                  id="roomId"
                  className="p-2 md:ml-5 flex-1 text-sm md:text-xl text-brown focus:outline-brown"
                  onChange={(e) => setRoomId(e.target.value)}
                />
              </div>
            </div>
            <DnDButton onClick={joinRoom}>Join Room</DnDButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
