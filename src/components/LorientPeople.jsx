/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 LorientPeople.glb --transform 
Files: LorientPeople.glb [13.82MB] > D:\projects\Threejs\r3f-vite-starter\public\models\LorientPeople-transformed.glb [419.56KB] (97%)
*/

import React, { useRef } from 'react'
import { MeshBasicMaterial, LineBasicMaterial } from 'three'
import { useGLTF } from '@react-three/drei'

export function LorientPeople(props) {
  const meshBasic = new MeshBasicMaterial({color:'red'})
  const lineMaterial = new LineBasicMaterial({ color: '#909090', linewidth: 10 })
  const { nodes, materials } = useGLTF('/models/LorientPeople.glb')

  console.log('LorientPeople nodes:', nodes)
  console.log('LorientPeople materials:', materials)

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.mergedPeople_1.geometry} material={meshBasic} />
      <lineSegments geometry={nodes.mergedPeople_2.geometry} material={lineMaterial} />
    </group>
  )
}

useGLTF.preload('/models/LorientPeople.glb')