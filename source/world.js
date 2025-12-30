////////////////////////////////////////////////////////
//*--------------------------------------------------*//
//| Part of Another Side (https://www.maus-games.at) |//
//*--------------------------------------------------*//
//| Copyright (c) 2021 Martin Mauersics              |//
//| Released under the zlib License                  |//
//*--------------------------------------------------*//
////////////////////////////////////////////////////////
"use strict";
class CWorld extends windObject {


// ****************************************************************
static Init()
{
    CWorld.s_pModel  = new windModel ().Create(RES.CBlock.s_afVertexData,  RES.CBlock.s_aiIndexData);
    CWorld.s_pShader = new windShader().Create(RES.CBlock.s_sVertexShader, RES.CWorld.s_sFragmentShader);
}


// ****************************************************************
static Exit()
{
    CWorld.s_pModel .Destructor();
    CWorld.s_pShader.Destructor();
}


// ****************************************************************
constructor()
{
    super();

    vec3.set(this.m_vSize,  2.0,  2.0,  2.0);
    vec4.set(this.m_vColor, 0.65, 0.65, 0.65, 1.0);
    this.m_pModel  = CWorld.s_pModel;
    this.m_pShader = CWorld.s_pShader;
}


} // class CWorld