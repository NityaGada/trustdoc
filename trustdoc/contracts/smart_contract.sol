// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract DocumentDetails {
    address public doctor;
    bool public isGenuine;
    bytes32 private docHash;

    struct New_Product {
        string uname;
        string udate;
        string docid;
        string docname;
        string doccontent;
    }

    mapping(uint => New_Product) products;

    mapping(string => bytes32) docidHash;
   
    modifier onlydoctor {
        require(msg.sender == doctor, "Only doctor can call this function");
        _;
    }

    uint public productCount;

    event ProductAdded(string _uname, string _udate, string _docid, string _docname, string _doccontent);
  
    function addProduct(string memory _uname, string memory _udate, string memory _docid, string memory _docname, string memory _doccontent) public returns(bytes32 _docHash) {
        productCount++;
        products[productCount] = New_Product(_uname, _udate, _docid, _docname, _doccontent);
        emit ProductAdded(_uname, _udate, _docid, _docname, _doccontent);
        isGenuine = true;
        docHash = sha256(abi.encode(_docid));
        docidHash[_docid] = docHash;
        return docHash;
    }


    function getProductDetails()  public view returns (New_Product[] memory) {
        New_Product[] memory prod = new New_Product[](productCount);
        for (uint i = 1; i <= productCount; i++) {
            prod[i-1] = products[i];
        }
        return prod;
    }

    function checkgenuine(string memory _docid) public view returns (bool) {
        bytes32 ve = sha256(abi.encode(_docid)); // Hash of the input
        bytes32 actual = docidHash[_docid]; // Stored hash
        return (ve == actual);
    }
}
