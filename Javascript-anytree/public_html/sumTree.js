/*
 * Student Info: Name=Lo,WeiShun , ID= 13108
 * Subject: CourseNo_HWNo_Summer_2015
 * Author: raliclo
 * Filename: sumTree.js
 * Date and Time: Apr 14, 2016 9:35:11 AM
 * Project Name: javascript-anytree
 */
/*
 * Copyright 2016 raliclo.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/*
 *
 2) Write a method to create new tree with same structure but the
 values of each node will be sum of their descendents (sub tree).
 The leaf nodes will become 0. So if the tree is 50 30 10 40 60 55 75 (PreOrder)
 then new tree should be 270 50 0 0 130 0 0(PreOrder)



 t3--
 input:
 //                50
 //          30          60
 //       10    40    55    75
 //                     35  20  5 

 output:
 //                230
 //            50         180
 //         0    0     35      25
 //                      0   0   0 

t4--
input:
 //        50
 //   30          60
 //10    40      55    75


 output:
 //       270
 //  50         130
 //0    0    0      0
 */



/* global Tree */

var t3 = new Tree();
var t4 = new Tree();
//
t3.root = new Node(50);
t3.root.left = new Node(30);
t3.root.left.left = new Node(10);
t3.root.left.right = new Node(40);
t3.root.right = new Node(60);
t3.root.right.left = new Node(55);
t3.root.right.left.left = new Node(35);
t3.root.right.right = new Node(75);
t3.root.right.right.left = new Node(20);
t3.root.right.right.right = new Node(5);
t3.size = 10;

t4.root = new Node(50);
t4.root.left = new Node(30);
t4.root.left.left = new Node(10);
t4.root.left.right = new Node(40);
t4.root.right = new Node(60);
t4.root.right.left = new Node(55);
t4.root.right.right = new Node(75);
t4.size = 7;

// BFSwalk 
// a. temporay registered a parent pointer for non-root nodes.
// b. save BFS walked nodes sequentially in BFS array 

Tree.prototype.BFSwalk = function (node) {
    if (this.BFS === undefined) {
        console.log("[Info]Register a BFS array for the tree");
        this.BFS = [];
        this.BFS.push(node);
    }
    if (node === null) {
        return;
    }
    if (node.left !== null) {
        node.left.parent = node;
        this.BFS.push(node.left);
    }
    if (node.right !== null) {
        node.right.parent = node;
        this.BFS.push(node.right);
    }
    this.BFSwalk(node.left);
    this.BFSwalk(node.right);
};


var findBFS = function (tree) {
    tree.BFSwalk(tree.root);
    ans = tree.BFS;
    return ans;
};

var sumNode = function (node) {
    if (node.parent !== undefined) {
        if (node.parent.subsum === undefined) {
            node.parent.subsum = 0;
        }
        if (node.left === null && node.right === null) {
            console.log("[Info]Leaf Node becomes zero after pass data to parent's subsum");
            node.parent.subsum += node.data;
            delete node.parent;
            node.data = 0;
        } else {
            console.log("[Info]Middle level pass its subsum and its data to parent then replace data by subsum");
            node.parent.subsum += node.data+node.subsum;
            delete node.parent;
            node.data = node.subsum;
            delete node.subsum; // cleanup subsum
        }
    } else {
        console.log("[Info]Root level's data is sum of left.data and right.data");
        node.data = node.data + node.left.data + node.right.data;
        delete node.subsum;
    }
};

var sumTree = function (anytree) {
    console.log(anytree);
    anytree.BFSwalk(anytree.root);// create BFSwalk array
    console.log(anytree.BFS);

    while (anytree.BFS.length > 0) {
        var tempNode = anytree.BFS.pop();
        sumNode(tempNode); // Calculate each Node from tail to head
        console.log(tempNode);
    }
        console.log(anytree);
        anytree.inorder(anytree.root); // create inorder array
        console.log(anytree.INORDER); // print inorder array
        delete anytree.BFS;     // remove registered BFSwalk array
        delete anytree.INORDER; // remove registered inorder array
};

var beginTime = new Date();
console.log("sumTree",sumTree(t4));
var endTime = new Date();
console.log("Ralic's Runtime:", endTime - beginTime);

var beginTime = new Date();
console.log("sumTree",sumTree(t3));
var endTime = new Date();
console.log("Ralic's Runtime:", endTime - beginTime);
