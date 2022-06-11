import { Avatar, Button } from 'antd'
import './style.scss'

function UserSuggestion({
  image, name, bio, userId,
}: any) {
  // todo: get the random list from users that not followed by the user
  return (
    <div className="user-suggestion">
      <div className="user-card">
        <Avatar size="large" src={require('../../assets/images/default-user.jpg')} />
        <h3>name</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumq
          ue, necessitatibus.dsjccisjcdisjcosidcjscoisdj
        </p>
        <Button type="primary" block>Follow</Button>
      </div>
      {/* ************************** */}
      <div className="user-card">
        <Avatar size="large" src={require('../../assets/images/default-user.jpg')} />
        <h3>name</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumq
          ue, necessitatibus.dsjccisjcdisjcosidcjscoisdj
        </p>
        <Button type="primary" block>Follow</Button>
      </div>
      <div className="user-card">
        <Avatar size="large" src={require('../../assets/images/default-user.jpg')} />
        <h3>name</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumq
          ue, necessitatibus.dsjccisjcdisjcosidcjscoisdj
        </p>
        <Button type="primary" block>Follow</Button>
      </div>
      <div className="user-card">
        <Avatar size="large" src={require('../../assets/images/default-user.jpg')} />
        <h3>name</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumq
          ue, necessitatibus.dsjccisjcdisjcosidcjscoisdj
        </p>
        <Button type="primary" block>Follow</Button>
      </div>
      <div className="user-card">
        <Avatar size="large" src={require('../../assets/images/default-user.jpg')} />
        <h3>name</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumq
          ue, necessitatibus.dsjccisjcdisjcosidcjscoisdj
        </p>
        <Button type="primary" block>Follow</Button>
      </div>
      <div className="user-card">
        <Avatar size="large" src={require('../../assets/images/default-user.jpg')} />
        <h3>name</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumq
          ue, necessitatibus.dsjccisjcdisjcosidcjscoisdj
        </p>
        <Button type="primary" block>Follow</Button>
      </div>
      <div className="user-card">
        <Avatar size="large" src={require('../../assets/images/default-user.jpg')} />
        <h3>name</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumq
          ue, necessitatibus.dsjccisjcdisjcosidcjscoisdj
        </p>
        <Button type="primary" block>Follow</Button>
      </div>
      <div className="user-card">
        <Avatar size="large" src={require('../../assets/images/default-user.jpg')} />
        <h3>name</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumq
          ue, necessitatibus.dsjccisjcdisjcosidcjscoisdj
        </p>
        <Button type="primary" block>Follow</Button>
      </div>
      <div className="user-card">
        <Avatar size="large" src={require('../../assets/images/default-user.jpg')} />
        <h3>name</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumq
          ue, necessitatibus.dsjccisjcdisjcosidcjscoisdj
        </p>
        <Button type="primary" block>Follow</Button>
      </div>
      <div className="user-card">
        <Avatar size="large" src={require('../../assets/images/default-user.jpg')} />
        <h3>name</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumq
          ue, necessitatibus.dsjccisjcdisjcosidcjscoisdj
        </p>
        <Button type="primary" block>Follow</Button>
      </div>
      <div className="user-card">
        <Avatar size="large" src={require('../../assets/images/default-user.jpg')} />
        <h3>name</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumq
          ue, necessitatibus.dsjccisjcdisjcosidcjscoisdj
        </p>
        <Button type="primary" block>Follow</Button>
      </div>
      {/* ************************** */}
    </div>
  )
}

export default UserSuggestion
