// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.7.0 <0.9.0;

contract ChatApp {
    constructor() {}

    //用户
    struct user {
        string name;
        friend[] friendList;
    }

    //朋友列表
    struct friend {
        address pubkey;
        string name;
    }

    //消息
    struct message {
        address sender;
        uint timestamp;
        string msg;
    }

    struct AllUserStruck {
        string name;
        address accountAddress;
    }

    AllUserStruck[] getAllUsers;

    //注册用户的地址和用户对应
    mapping(address => user) userList;

    //聊天记录对应关系(聊天2个用户哈希 对应 内容)
    mapping(bytes32 => message[]) allMessage;

    //检查用户是否已经存在
    function checkUserExists(address pubkey) public view returns (bool) {
        // bytes(userList[pubkey].name)转换为bytes才能获取长度
        return bytes(userList[pubkey].name).length > 0;
    }

    //创建聊天用户
    function createAccount(string calldata name) external {
        //检查用户是否已经注册
        require(checkUserExists(msg.sender) == false, "User already exists");
        //检查注册用户名是否合法
        require(bytes(name).length > 0, "The name is not legal.");
        userList[msg.sender].name = name;
        getAllUsers.push(AllUserStruck(name, msg.sender));
    }

    //获取用户名
    function getUserName(address pubkey) external view returns (string memory) {
        //检查用户是否存在
        require(checkUserExists(pubkey), "User don't exists");
        return userList[pubkey].name;
    }

    //检查是不是已经有该好友
    function checkAlreadyFriends(
        address pubkey1,
        address pubkey2
    ) public view returns (bool) {
        //用较小长度的数组来变量
        if (
            userList[pubkey1].friendList.length >
            userList[pubkey2].friendList.length
        ) {
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for (uint i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) {
                return true;
            }
        }
        return false;
    }

    function _addFriend(
        address me,
        address myFriend_key,
        string memory name
    ) internal {
        friend memory newFriend = friend(myFriend_key, name);
        userList[me].friendList.push(newFriend);
    }

    //添加朋友
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "First you need to create a user");
        require(checkUserExists(friend_key), "The added user does not exist");
        require(msg.sender != friend_key, "Can't add yourself");
        require(
            checkAlreadyFriends(msg.sender, friend_key) == false,
            "It's already a friend of yours."
        );
        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    //获取朋友列表
    function getMyFriendList(
        address pubkey
    ) external view returns (friend[] memory) {
        return userList[pubkey].friendList;
    }

    //获取聊天码，用2个用户名进行哈希
    function _getChatCode(
        address pubkey1,
        address pubkey2
    ) internal pure returns (bytes32) {
        if (pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else return keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    //发送信息
    function sendMessage(address friend_key, string calldata _msg) external {
        //检查发送信息用户是否已经注册
        require(checkUserExists(msg.sender), "User don't exists");
        require(checkUserExists(friend_key), "friend don't exists");
        require(
            checkAlreadyFriends(msg.sender, friend_key),
            "you are not friend"
        );

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessage[chatCode].push(newMsg);
    }

    //查看聊天记录
    function readMessage(
        address friend_key
    ) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessage[chatCode];
    }

    //获取一句注册的所有用户
    function getAllAppUser() public view returns (AllUserStruck[] memory) {
        return getAllUsers;
    }
}
