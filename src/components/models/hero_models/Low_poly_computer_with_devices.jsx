
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Lowroom(props) {
  const { nodes, materials } = useGLTF('/models/low_poly_computer_with_devices.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials.base} position={[-0.135, 1.001, -0.781]} />
      <mesh geometry={nodes.Object_6.geometry} material={materials.base} position={[-0.241, 0.102, 0.662]} />
      <mesh geometry={nodes.Object_8.geometry} material={materials.base} position={[0.82, 0.096, 0.29]} />
      <mesh geometry={nodes.Object_10.geometry} material={materials.base} position={[-1.095, 0, 0.309]} />
      <mesh geometry={nodes.Object_12.geometry} material={materials.base} position={[0.864, 0, -1.493]} />
      <mesh geometry={nodes.Object_14.geometry} material={materials.base} position={[-0.241, 0.102, 0.662]} />
      <mesh geometry={nodes.Object_16.geometry} material={materials.base} position={[0.82, 0.096, 0.29]} />
      <mesh geometry={nodes.Object_18.geometry} material={materials.base} position={[-0.05, 0.087, -0.573]} />
      <mesh geometry={nodes.Object_20.geometry} material={materials.base} position={[-0.099, 0.884, -0.257]} scale={1.002} />
    </group>
  )
}

useGLTF.preload('./models/low_poly_computer_with_devices.glb')
