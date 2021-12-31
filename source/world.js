////////////////////////////////////////////////////////
//*--------------------------------------------------*//
//| Part of Another Side (https://www.maus-games.at) |//
//*--------------------------------------------------*//
//| Copyright (c) 2021 Martin Mauersics              |//
//| Released under the zlib License                  |//
//*--------------------------------------------------*//
////////////////////////////////////////////////////////
"use strict";
class cWorld extends windObject {


// ****************************************************************
static Init()
{
    cWorld.s_pModel  = new windModel ().Create(RES.cBlock.s_afVertexData,  RES.cBlock.s_aiIndexData);
    cWorld.s_pShader = new windShader().Create(RES.cBlock.s_sVertexShader, RES.cWorld.s_sFragmentShader);
}


// ****************************************************************
static Exit()
{
    cWorld.s_pModel .Destructor();
    cWorld.s_pShader.Destructor();
}


// ****************************************************************
constructor()
{
    super();

    vec3.set(this.m_vSize,  2.0,  2.0,  2.0);
    vec4.set(this.m_vColor, 0.65, 0.65, 0.65, 1.0);
    this.m_pModel  = cWorld.s_pModel;
    this.m_pShader = cWorld.s_pShader;
}


} // class cWorld